require('dotenv').config();
const jwt = require('jsonwebtoken');


const prisma = require("../db/prismaClient");


const getComments = async (req, res) => {
  let userId = req.query.userId;
  if(req.headers.authorization != undefined || req.headers.athorization != null) {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    userId = user.id;
  }
  

  if (req.query.sort == "date" && req.query.direction && userId) {
    let comments = await prisma.comments.findMany({
      where: {
        blogId: req.params.blogId
      },
      orderBy: {
        createdAt: req.query.direction,
      },
      include: {
        user: {
          select: {
            username: true
          }
        },
        UserLikedComments: {
          where: {
            like: true,
          }
        },
        authorHeartedComments: {

        },
        _count: {
          select: {
            UserLikedComments: {
              where: {
                like: false,
              }
            }
          }
        },
      }
    });

    const loggedInUsersLikes = await prisma.userLikedComments.findMany({
      where: {
        userId: userId,
      }
    });

    comments.forEach((comment) => {
      loggedInUsersLikes.forEach((userLike) => {
        if(userLike.commentId == comment.id) {
          comment.userLikeStatus = userLike.like;
        }
      })
    })

    res.json(comments);
  } else if (req.query.sort == "likes" && req.query.direction && userId) {
    let comments = await prisma.comments.findMany({
      where: {
        blogId: req.params.blogId
      },
      include: {
        user: {
          select: {
            username: true
          }
        },
        UserLikedComments: {
          where: {
            like: true,
          }
        },
        authorHeartedComments: {

        },
        _count: {
          select: {
            UserLikedComments: {
              where: {
                like: false,
              }
            }
          }
        },
      }
    });

    const loggedInUsersLikes = await prisma.userLikedComments.findMany({
      where: {
        userId: userId,
      }
    });

    comments.forEach((comment) => {
      loggedInUsersLikes.forEach((userLike) => {
        if(userLike.commentId == comment.id) {
          comment.userLikeStatus = userLike.like;
        }
      })
    })

    const sortedByCommentLikes = comments.sort((a, b) =>  b.UserLikedComments.length - a.UserLikedComments.length)

    res.json(sortedByCommentLikes);
  } else if(userId == undefined){
    const comments = await prisma.comments.findMany({
      where: {
        blogId: req.params.blogId
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            username: true
          }
        },
        authorHeartedComments: {

        },
        UserLikedComments: {
          where: {
            like: true,
          }
        },
        _count: {
          select: {
            UserLikedComments: {
              where: {
                like: false,
              }
            }
          }
        },
      }
    });

    res.json(comments);
  } else if(userId != undefined) {
    let comments = await prisma.comments.findMany({
      where: {
        blogId: req.params.blogId
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            username: true
          }
        },
        UserLikedComments: {
          where: {
            like: true,
          }
        },
        authorHeartedComments: {

        },
        _count: {
          select: {
            UserLikedComments: {
              where: {
                like: false,
              }
            }
          }
        },
      }
    });

    const loggedInUsersLikes = await prisma.userLikedComments.findMany({
      where: {
        userId: userId,
      }
    });

    comments.forEach((comment) => {
      loggedInUsersLikes.forEach((userLike) => {
        if(userLike.commentId == comment.id) {
          comment.userLikeStatus = userLike.like;
        }
      })
    })

    res.json(comments);
  } 



};

const postComment = async (req, res) => {
  console.log('posting comment...')
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  await prisma.comments.create({
    data: {
      commentTitle: req.body.title,
      comment: req.body.comment,
      userId: decoded.id,
      blogId: req.body.blogId,
    }
  })
  console.log('comment posted');
  res.status(200);
};

const updateLikeOrDislikeComment = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);

  const checkIfUserHasLike = await prisma.userLikedComments.findFirst({
    where: {
      commentId: req.params.commentId,
      userId: user.id,
    }
  });

  if(checkIfUserHasLike == null && req.params.likeStatus != 'null') {
    const likeBool = req.params.likeStatus == 'true' ? true : false;
    await prisma.userLikedComments.create({
      data: {
        userId: user.id,
        commentId: req.params.commentId,
        like: likeBool,
      }
    })
  }

 

  // console.log(req.params.likeStatus)
  // console.log(req.params.commentId)
  res.end()

};


// will do the opposite of current value of author heart true/false

const updateCommentAuthorHeart = async (req, res) => {

  // check if correct author of blog

  const blogData = await prisma.blogs.findFirst({
    where: {
      id: req.params.blogId,
    }
  });

  if (blogData.authorId == req.params.authorId) {
    const commentData = await prisma.comments.findFirst({
      where: {
        blogId: req.params.blogId,
        id: req.params.commentId,
      },
      
    })

    const updatedComment = await prisma.comments.update({
      where: {
        blogId: req.params.blogId,
        id: req.params.commentId,
      },
      data: {
        authorHeart: !commentData.authorHeart
      }
    });


    res.json(updatedComment);
  }



};



module.exports = {
  getComments,
  postComment,
  updateLikeOrDislikeComment,
  updateCommentAuthorHeart,
};

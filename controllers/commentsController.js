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
  } else if(req.params.likeStatus == 'null' && checkIfUserHasLike) {
    await prisma.userLikedComments.delete({
      where: {
        id: checkIfUserHasLike.id,
      }
    });
  } else if(req.params.likeStatus != 'null' && checkIfUserHasLike && checkIfUserHasLike != req.params.likeStatus) {
    const likeBool = req.params.likeStatus == 'true' ? true : false;

    await prisma.userLikedComments.update({
      where: {
        id: checkIfUserHasLike.id,
      },
      data: {
        like: likeBool,
      }
    })
  }

  res.end()

};


// will do the opposite of current value of author heart true/false

const updateCommentAuthorHeart = async (req, res) => {

  const token = (req.headers.authorization.split(' '))[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  // check if correct author of blog
  const author = await prisma.authors.findFirst({
    where: {
      userId: user.id,
      id: req.params.authorId
    },
  });

  const checkIfAlreadyFavorited = await prisma.authorHeartedComments.findFirst({
    where: {
      commentId: req.params.commentId,
    }
  });

  if(author && checkIfAlreadyFavorited) {
    const deletedHeart = await prisma.authorHeartedComments.delete({
      where: {
        id: checkIfAlreadyFavorited.id,
      }
    });
    res.json(deletedHeart)
  } else if (author && !checkIfAlreadyFavorited) {
    const createdUser = await prisma.authorHeartedComments.create({
      data: {
        authorId: author.id,
        commentId: req.params.commentId,
      }
    })
    res.json(createdUser)
  }

};

const deleteComment = async (req, res) => {
  const token = req.headers.authorization;
  // const deletedLike = await prisma.userLikedComments.delete({
  //   where: {
  //     id: req.params.id,
  //   }
  // })
  // res.json(deletedLike)
}



module.exports = {
  getComments,
  postComment,
  updateLikeOrDislikeComment,
  updateCommentAuthorHeart,
  deleteComment,
};

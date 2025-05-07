const prisma = require("../db/prismaClient");

const getComments = async (req, res) => {
  
  if (req.query.sort == "date" && req.query.direction && req.query.userId) {
    const comments = await prisma.comments.findMany({
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
            userId: req.query.userId,
          },
          select: {
            userId: true,
            like: true,
          }
        }
      }
    });

    res.json(comments);
  } else if (req.query.sort == "likes" && req.query.direction && req.query.userId) {
    const comments = await prisma.comments.findMany({
      orderBy: {
        likes: req.query.direction,
      },
      include: {
        user: {
          select: {
            username: true
          }
        },
        UserLikedComments: {
          where: {
            userId: req.query.userId,
          },
          select: {
            userId: true,
            like: true,
          }
        }
      }
    });

    res.json(comments);
  } else if(req.query.userId == undefined){
    const comments = await prisma.comments.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            username: true
          }
        },
      }
    });

    res.json(comments);
  } else if(req.query.userId != undefined) {
    const comments = await prisma.comments.findMany({
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
            userId: req.query.userId,
          },
          select: {
            userId: true,
            like: true,
          }
        }
      }
    });

    res.json(comments);
  }
};

const postComment = async (req, res) => {
  await prisma.comments.create({
    data: {
      commentTitle: req.body.title,
      comment: req.body.comment,
      userId: req.body.userId,
      blogId: req.body.blogId,
    }
  })
  console.log('comment posted');
  res.redirect('/comments');
};

const updateLikeOrDislikeComment = async (req, res) => {

  let operator = (req.query.operatorType == 'increment' || req.query.operatorType == 'decrement') ? req.query.operatorType : 'increment';

  if(req.query.like == 'true') {

    await prisma.comments.update({
      where: {
        id: req.query.commentId,
      },
      data: {
        likes: {
          [operator]: 1,
        }
      }
    });

  } else if (req.query.like == 'false') {

    await prisma.comments.update({
      where: {
        id: req.query.commentId,
      },
      data: {
        dislikes: {
          [operator]: 1,
        }
      }
    });

  }



  res.redirect('/comments');
};



module.exports = {
  getComments,
  postComment,
  updateLikeOrDislikeComment,
};

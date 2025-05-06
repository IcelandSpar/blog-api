const prisma = require("../db/prismaClient");

const getComments = async (req, res) => {
  if (req.query.sort == "date" && req.query.direction) {
    const comments = await prisma.comments.findMany({
      orderBy: {
        createdAt: req.query.direction,
      },
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    });

    res.json(comments);
  } else if (req.query.sort == "likes" && req.query.direction) {
    const comments = await prisma.comments.findMany({
      orderBy: {
        likes: req.query.direction,
      },
    });

    res.json(comments);
  } else {
    const comments = await prisma.comments.findMany({
      orderBy: {
        createdAt: "desc",
      },
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

  if(req.query.like == 'true') {

    await prisma.comments.update({
      where: {
        id: req.query.commentId,
      },
      data: {
        likes: {
          increment: 1,
        }
      }
    });

  } else {

    await prisma.comments.update({
      where: {
        id: req.query.commentId,
      },
      data: {
        dislikes: {
          increment: 1,
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

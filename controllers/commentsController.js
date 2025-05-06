const prisma = require("../db/prismaClient");

const getComments = async (req, res) => {
  if (req.query.sort == "date" && req.query.direction) {
    const comments = await prisma.comments.findMany({
      orderBy: {
        createdAt: req.query.direction,
      },
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

module.exports = {
  getComments,
};

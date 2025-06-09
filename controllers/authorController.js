require('dotenv').config();
const prisma = require('../db/prismaClient');
const jwt = require('jsonwebtoken');

const getAuthorAbout = async (req, res) => {
  const authorData = await prisma.authors.findFirst({
    where: {
      id: req.params.userId,
    },
    select: {
      id: true,
      bio: true,
      user: {
        omit: {
          password: true,
        }
      }
    }
  });
  res.json(authorData);
};

const checkIfAuthor = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  const author = await prisma.authors.findFirst({
    where: {
      userId: user.id,
    }
  })
  res.json({
    author,
  })
}



module.exports = {
getAuthorAbout,
checkIfAuthor,
}
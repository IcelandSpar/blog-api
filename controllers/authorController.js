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
      joined: true,
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
    },
    include: {
      user: {
        select: {
          username: true,
        }
      }
    }
  })
  res.json({
    author,
  })
}

const becomeAuthor = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);

  if(user) {
    await prisma.authors.create({
      data: {
        bio: req.body.bio,
        userId: user.id,
      }
    })
  }

  const author = await prisma.authors.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      user: {
        select: {
          username: true,
        }
      }
    }
  })
  res.json({
    author,
  })
};

const deleteAuthor = async (req, res) => {
  const deletedAuthor = await prisma.authors.delete({
    where: {
      id: req.params.id,
    }
  })

  res.json(deletedAuthor)
}

const getAuthorInfo = async (req, res) => {
  const token = jwt.verify(req.headers.authorization, process.env.JWT_SECRET).split(' ')[1];
  res.json(token)
  // const authorInfo = await prisma.authors.findFirst({

  // })
}


module.exports = {
getAuthorAbout,
checkIfAuthor,
becomeAuthor,
deleteAuthor,
getAuthorInfo,
}
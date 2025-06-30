require('dotenv').config();
const prisma = require('../db/prismaClient');
const jwt = require('jsonwebtoken');

const getAuthorAbout = async (req, res) => {
  const authorData = await prisma.authors.findFirst({
    where: {
      id: req.params.authorId,
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
  const token = req.headers.authorization.split(' ')[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);  
  res.json(user)
  // const authorInfo = await prisma.authors.findFirst({

  // })
}

const updateAuthorBio = async (req, res) => {

  const token = req.headers.authorization.split(' ')[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  const updatedUser = await prisma.authors.update({
    where: {
      id: req.params.authorId,
      userId: user.id,
    },
    data: {
      bio: req.body.bio,
    }
  })
  res.json(updatedUser);
};

const getAuthorBlogs = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  const authorBlogs = await prisma.blogs.findMany({
    where: {
      authorId: req.params.authorId,
    },
    omit: {
      content: true,
    },
    include: {
      UsersLikedBlogs: {
        select: {
          like: true,
        },
      },
      _count: {
        select: {
          Comments: true,
        }
      }
    },
    orderBy: {
      createdAt: 'asc',
    }

  });

  const likesAndDislikes = prisma.blog
  // const authorBlogsWithLikes = 

  res.json(authorBlogs)
}

const deleteBlog = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);

  const isUserAuthor = await prisma.authors.findFirst({
    where: {
      userId: user.id,
    }
  });


  const blogToBeDeleted = await prisma.blogs.findFirst({
      where: {
        id: req.params.blogId,
      },
  })

    // if user who sent request is the author of the blog, then delete
    if(blogToBeDeleted.authorId == isUserAuthor.id) {
  const deletedBlog = await prisma.blogs.delete({
    where: {
      id: req.params.blogId,
    }
  });
      return res.json(deletedBlog);
    } else {
      return res.status(401);
    }
}


module.exports = {
getAuthorAbout,
checkIfAuthor,
becomeAuthor,
deleteAuthor,
getAuthorInfo,
updateAuthorBio,
getAuthorBlogs,
deleteBlog,
}
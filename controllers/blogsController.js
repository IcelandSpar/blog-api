require('dotenv').config();
const { compare } = require('bcryptjs');
const prisma = require('../db/prismaClient');
const jwt = require('jsonwebtoken');



const getBlogs = async (req, res) => {
  const blogs = await prisma.blogs.findMany();

  res.json(blogs);
};

const getBlog = async (req, res) => {
  const blog = await prisma.blogs.findFirst({
    where: {
      id: req.params.blogId
    },
    include: {
      _count: {
        select: {
          UsersLikedBlogs: {
            where: {
              like: true,
            }
          }
        }
      },
      author: {
        include: {
          user: {
            select: {
              username: true,
            }
          }
        }
      }
    }
  });

  const dislikes = await prisma.usersLikedBlogs.count({
    where: {
      blogId: req.params.blogId,
      like: false,
    }
  })

blog.dislikes = dislikes;

  res.json(blog);
};

const getUserLikeOnBlog = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

  const userLike = await prisma.usersLikedBlogs.findFirst({
    where: {
      userId: verifiedToken.id,
      blogId: req.params.blogId,
    }
  });

  res.json(userLike);
}

const getBlogPreviews = async (req, res) => {

  if(req.query.sort == 'date') {
    const blogPreview = await prisma.blogs.findMany({
      where: {
        // published: true,
      },
      include: {
        _count: {
          select: {
            UsersLikedBlogs: {
              where: {
                like: true,
              }
            }
          }
        },
        author: {
          include: {
            user: {
              select: {
                username: true,
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: req.query.direction,
      }
    })
    res.json(blogPreview);
  } else if (req.query.sort == 'likes') {
    const blogPreview = await prisma.blogs.findMany({
      where: {
        // published: true,
      },
      include: {
        _count: {
          select: {
            UsersLikedBlogs: {
              where: {
                like: true,
              }
            }
          }
        },
        author: {
          include: {
            user: {
              select: {
                username: true,
              }
            }
          }
        }
      },
    });

    const compareFunc = (a, b) => b._count.UsersLikedBlogs - a._count.UsersLikedBlogs;
    

    let sortedBlogPreview = blogPreview.sort(compareFunc)

    res.json(sortedBlogPreview);

  } else {


    const blogPreview = await prisma.blogs.findMany({
      where: {
        // published: true,
      },
      include: {
        _count: {
          select: {
            UsersLikedBlogs: {
              where: {
                like: true,
              }
            }
          }
        },
        author: {
          include: {
            user: {
              select: {
                username: true,
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
    res.json(blogPreview);
  }

};

const postBlog = async (req, res) => {

  const blogToPost = await prisma.blogs.create({
    data: {
      title: req.body.title,
      content: req.body.content,
      published: (req.body.published == 'true' ? true : false),
      authorId: req.body.authorId,
    }
  });

  console.log('Blog posted');
  res.json(blogToPost);
};


const updatePublishStatus = async (req, res) => {
  const blogToUpdate = await prisma.blogs.findFirst({
    where: {
      id: req.body.blogId,
    }
  });

  const updatedBlogPublishStatus = await prisma.blogs.update({
    where: {
      id: req.body.blogId,
    },
    data: {
      published: !blogToUpdate.published,
    }
  })

  res.json(updatedBlogPublishStatus);


};

const likeBlog = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  

  const checkUserBlogLike = await prisma.usersLikedBlogs.findFirst({
    where: {
      blogId: req.params.blogId,
      userId: user.id,
    }
  });

  const likeBool = (req.params.likeBool == 'true' ? true : false);

  if(checkUserBlogLike == null) {
    const createdLikedRecord = await prisma.usersLikedBlogs.create({
      data: {
        like: likeBool,
        blogId: req.params.blogId,
        userId: user.id,
      }
    })
    res.json(createdLikedRecord);
  } else if(checkUserBlogLike.like == likeBool) {
    const deletedLikeRecord = await prisma.usersLikedBlogs.delete({
      where: {
        id: checkUserBlogLike.id,
      },
    });
    res.json(deletedLikeRecord);

  } else if(checkUserBlogLike.like != likeBool) {
    const updatedLikeRecord = await prisma.usersLikedBlogs.update({
      where: {
        id: checkUserBlogLike.id,
      },
      data: {
        like: likeBool,
      }
    });
    res.json(updatedLikeRecord)
  }
};

const deleteUserBlogLike = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);

  const likeToBeDeleted = await prisma.usersLikedBlogs.findFirst({
    where: {
      userId: user.id,
      blogId: req.params.blogId,
    }
  })

  const deletedLike = await prisma.usersLikedBlogs.delete({
    where: {
      id: likeToBeDeleted.id,
    }
  });


  res.json(deletedLike)
  
}




module.exports = {
  getBlogs,
  getBlog,
  getUserLikeOnBlog,
  getBlogPreviews,
  updatePublishStatus,
  postBlog,
  likeBlog,
  deleteUserBlogLike,
}
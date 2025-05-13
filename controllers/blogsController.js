const prisma = require('../db/prismaClient');


const getBlogs = async (req, res) => {
  const blogs = await prisma.blogs.findMany();

  res.json(blogs);
};

const getBlogPreviews = async (req, res) => {
  const blogPreview = await prisma.blogs.findMany({
    where: {
      published: true,
    },

    include: {
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

  res.json(blogPreview);
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

  const checkUserBlogLike = await prisma.usersLikedBlogs.findFirst({
    where: {
      blogId: req.params.blogId,
      userId: req.params.userId,
    }
  });

  const likeBool = (req.params.likeBool == 'true' ? true : false);

  if(checkUserBlogLike == null) {
    const createdLikedRecord = await prisma.usersLikedBlogs.create({
      data: {
        like: likeBool,
        blogId: req.params.blogId,
        userId: req.params.userId,
      }
    })
    res.json(createdLikedRecord);
  } else if(checkUserBlogLike.like == likeBool) {
    console.log(checkUserBlogLike.like, likeBool)
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



module.exports = {
  getBlogs,
  getBlogPreviews,
  updatePublishStatus,
  postBlog,
  likeBlog,
}
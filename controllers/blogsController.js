const prisma = require('../db/prismaClient');


const getBlogs = async (req, res) => {
  const blogs = await prisma.blogs.findMany();

  res.json(blogs);
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



module.exports = {
  getBlogs,
  updatePublishStatus,
  postBlog,
}
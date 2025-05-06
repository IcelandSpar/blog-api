const prisma = require('../db/prismaClient');


const getBlogs = async (req, res) => {
  const blogs = await prisma.blogs.findMany();

  res.json(blogs);
};



module.exports = {
  getBlogs,
}
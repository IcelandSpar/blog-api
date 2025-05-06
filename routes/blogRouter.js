const { Router } = require('express');
const { getBlogs } = require('../controllers/blogsController');

const blogRouter = Router();


blogRouter.get('/', getBlogs);


module.exports = blogRouter;
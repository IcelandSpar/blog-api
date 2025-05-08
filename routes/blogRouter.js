const { Router } = require('express');
const { getBlogs, updatePublishStatus } = require('../controllers/blogsController');

const blogRouter = Router();


blogRouter.get('/', getBlogs);

// Form data needed to update: 
// body.blogId

blogRouter.put('/publish', updatePublishStatus);


module.exports = blogRouter;
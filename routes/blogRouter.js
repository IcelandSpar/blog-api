const { Router } = require('express');
const { getBlogs, getBlog, updatePublishStatus, postBlog, likeBlog, getBlogPreviews } = require('../controllers/blogsController');
const passport = require('passport');
const blogRouter = Router();



blogRouter.get('/', getBlogs);


blogRouter.get('/preview', getBlogPreviews);

blogRouter.get('/:blogId', getBlog);


// Form data needed to post blog: 

// data: {
//   title: req.body.title,
//   content: req.body.content,
//   published: (req.body.published == 'true' ? true : false),
//   authorId: req.body.authorId,
// }

blogRouter.post('/post-blog', postBlog);

// Form data needed to update: 
// body.blogId

blogRouter.put('/publish', updatePublishStatus);

blogRouter.put('/like-blog/:blogId/:userId/:likeBool', likeBlog);


module.exports = blogRouter;
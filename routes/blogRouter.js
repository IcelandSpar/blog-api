const { Router } = require('express');
const { getBlogs, updatePublishStatus, postBlog, likeBlog, getBlogPreviews } = require('../controllers/blogsController');

const blogRouter = Router();



blogRouter.get('/', getBlogs);

blogRouter.get('/preview', getBlogPreviews);


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
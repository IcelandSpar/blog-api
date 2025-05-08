const { Router } = require('express');
const { getBlogs, updatePublishStatus, postBlog } = require('../controllers/blogsController');

const blogRouter = Router();


blogRouter.get('/', getBlogs);

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


module.exports = blogRouter;
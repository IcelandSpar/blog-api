const { Router } = require('express');
const { postBlogValidator } = require('../validators/blogValidators.js');
const { getBlogs, getBlog, updatePublishStatus, postBlog, likeBlog, getBlogPreviews, getUserLikeOnBlog, deleteUserBlogLike, editBlog } = require('../controllers/blogsController');
const passport = require('passport');
const blogRouter = Router();




blogRouter.get('/', getBlogs);


blogRouter.get('/preview', getBlogPreviews);



blogRouter.get('/:blogId', getBlog);

blogRouter.get('/:blogId/check-user-like', passport.authenticate('jwt', {session: false}), getUserLikeOnBlog);
blogRouter.put('/edit-blog/:blogId', passport.authenticate('jwt', {session: false}), postBlogValidator, editBlog);

// Form data needed to post blog: 

// data: {
//   title: req.body.title,
//   content: req.body.content,
//   published: (req.body.published == 'true' ? true : false),
//   authorId: req.body.authorId,
// }

blogRouter.post('/post-blog', passport.authenticate('jwt', {session: false}), postBlogValidator, postBlog);

// Form data needed to update: 
// body.blogId

blogRouter.put('/publish/:blogId/:publishStatus', passport.authenticate('jwt', {session: false}), updatePublishStatus);

blogRouter.put('/like-blog/:blogId/:likeBool', passport.authenticate('jwt', {session: false}),likeBlog);
blogRouter.delete('/delete-like-blog/:blogId/:likeBool', passport.authenticate('jwt', {session: false}), deleteUserBlogLike);


module.exports = blogRouter;
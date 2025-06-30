const { Router } = require('express');
const passport = require('passport');
const authorRouter = Router();

const { getAuthorAbout, checkIfAuthor, becomeAuthor, deleteAuthor, getAuthorInfo, updateAuthorBio, getAuthorBlogs, deleteBlog } = require('../controllers/authorController.js');

authorRouter.get('/about/author', getAuthorInfo);

authorRouter.get('/about/:authorId', getAuthorAbout);

authorRouter.get('/blogs/:authorId', passport.authenticate('jwt', {session: false}), getAuthorBlogs);


authorRouter.get('/check-if-author', passport.authenticate('jwt', {session: false}), checkIfAuthor);

authorRouter.post('/become-author', becomeAuthor);

authorRouter.delete('/delete-author/:id', deleteAuthor);

authorRouter.put('/update/:authorId', passport.authenticate('jwt', {session: false}), updateAuthorBio);

authorRouter.delete('/delete-blog/:blogId', passport.authenticate('jwt', {session: false}), deleteBlog)


module.exports = authorRouter;
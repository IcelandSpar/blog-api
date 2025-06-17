const { Router } = require('express');
const passport = require('passport');
const authorRouter = Router();

const { getAuthorAbout, checkIfAuthor, becomeAuthor, deleteAuthor, getAuthorInfo, updateAuthorBio, getAuthorBlogs } = require('../controllers/authorController.js');

authorRouter.get('/about/author', getAuthorInfo);

authorRouter.get('/about/:authorId', getAuthorAbout);

authorRouter.get('/blogs/:authorId', passport.authenticate('jwt', {session: false}), getAuthorBlogs);


authorRouter.get('/check-if-author', passport.authenticate('jwt', {session: false}), checkIfAuthor);

authorRouter.post('/become-author', becomeAuthor);

authorRouter.delete('/delete-author/:id', deleteAuthor);

authorRouter.put('/update/:authorId', passport.authenticate('jwt', {session: false}), updateAuthorBio);


module.exports = authorRouter;
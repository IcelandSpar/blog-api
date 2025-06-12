const { Router } = require('express');
const passport = require('passport');
const authorRouter = Router();

const { getAuthorAbout, checkIfAuthor, becomeAuthor, deleteAuthor, getAuthorInfo } = require('../controllers/authorController.js');

authorRouter.get('/about/author', getAuthorInfo);

authorRouter.get('/about/:authorId', getAuthorAbout);

authorRouter.get('/check-if-author', passport.authenticate('jwt', {session: false}), checkIfAuthor);

authorRouter.post('/become-author', becomeAuthor);

authorRouter.delete('/delete-author/:id', deleteAuthor);


module.exports = authorRouter;
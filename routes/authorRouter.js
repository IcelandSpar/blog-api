const { Router } = require('express');
const passport = require('passport');
const authorRouter = Router();

const { getAuthorAbout, checkIfAuthor } = require('../controllers/authorController.js');


authorRouter.get('/about/:authorId', getAuthorAbout);

authorRouter.get('/check-if-author', passport.authenticate('jwt', {session: false}), checkIfAuthor);


module.exports = authorRouter;
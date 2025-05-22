const { Router } = require('express');
const authorRouter = Router();

const { getAuthorAbout } = require('../controllers/authorController.js');


authorRouter.get('/about/:authorId', getAuthorAbout);


module.exports = authorRouter;
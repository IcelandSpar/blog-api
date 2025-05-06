const { Router } = require('express');
const { getComments } = require('../controllers/commentsController');

const commentsRouter = Router();


commentsRouter.get('/', getComments);


module.exports = commentsRouter;
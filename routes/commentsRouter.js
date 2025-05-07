const { Router } = require('express');
const { getComments, postComment, updateLikeOrDislikeComment } = require('../controllers/commentsController');
const prisma = require('../db/prismaClient');

const commentsRouter = Router();


commentsRouter.get('/', getComments);
commentsRouter.post('/post-comment', postComment);
commentsRouter.put('/like-comment', updateLikeOrDislikeComment);



module.exports = commentsRouter;
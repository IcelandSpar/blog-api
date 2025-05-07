const { Router } = require('express');
const { getComments, postComment, updateLikeOrDislikeComment, updateCommentAuthorHeart } = require('../controllers/commentsController');
const prisma = require('../db/prismaClient');

const commentsRouter = Router();

// example:
// http://localhost:3000/comments/:blogId?userId=1234&direction=asc/desc&sort=date/likes

commentsRouter.get('/:blogId', getComments);

// form data needed: 

// data: {
//   commentTitle: req.body.title,
//   comment: req.body.comment,
//   userId: req.body.userId,
//   blogId: req.body.blogId,
// }

commentsRouter.post('/post-comment', postComment);

// example: 
// http://localhost:3000/comments/like-comment?like=true/false&commentId=1234&operatorType=increment/decrement

commentsRouter.put('/like-comment', updateLikeOrDislikeComment);

commentsRouter.put('/author-heart/:blogId/:authorId/:commentId', updateCommentAuthorHeart);



module.exports = commentsRouter;
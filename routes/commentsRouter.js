const { Router } = require('express');
const passport = require('passport');
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

commentsRouter.post('/post-comment', passport.authenticate('jwt', {session: false}), postComment);

commentsRouter.delete('/delete/:commentId', async (req, res) => {
  const deletedItem = await prisma.comments.delete({
    where: {
      id: req.params.commentId,
    }
  });
  res.json(deletedItem);
});

// example: 
// http://localhost:3000/comments/like-comment?like=true/false&commentId=1234&operatorType=increment/decrement

commentsRouter.post('/like-comment/:commentId/:likeStatus',  passport.authenticate('jwt', {session: false}), updateLikeOrDislikeComment);

commentsRouter.put('/author-heart/:blogId/:authorId/:commentId', updateCommentAuthorHeart);

commentsRouter.delete('/delete-like/:id', async (req, res) => {
  const deletedLike = await prisma.userLikedComments.delete({
    where: {
      id: req.params.id,
    }
  })
  res.json(deletedLike)
})

module.exports = commentsRouter;
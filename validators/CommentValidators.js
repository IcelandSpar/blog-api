const { body } = require('express-validator');

const commentValidator = [
  body('title').trim()
    .notEmpty().withMessage('Title must not be empty')
    .isLength({max: 60, min: 1}).withMessage('Title must be between 1 - 60 characters'),
  body('comment').trim()
    .notEmpty().withMessage('Comment must not be empty')
    .isLength({min: 1, max: 255}).withMessage('Comment must be within 1 - 255 characters long'),
  body('blogId').trim()
    .notEmpty().withMessage('Blog id is empty')
    .isUUID().withMessage('Blog id does not exist')
]


module.exports = {
  commentValidator,
}
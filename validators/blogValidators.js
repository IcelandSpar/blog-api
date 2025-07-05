const { body } = require('express-validator');

const postBlogValidator = [
  body('title').trim()
  .notEmpty().withMessage('Title must not be empty')
  .isLength({min: 1, max: 255}).withMessage('Title must be between 1 - 255 characters'),
  body('content').trim()
    .notEmpty().withMessage('Blog content must not be empty')
    .isLength({min: 1, max: 10000}).withMessage('Blog content must be between 1 - 10,000 characters')
];

module.exports = {
  postBlogValidator,
}
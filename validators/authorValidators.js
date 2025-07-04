const { body } = require('express-validator');

const validateBio = [
  body('bio').trim()
  .notEmpty().withMessage('Bio cannot be empty')
  .isLength({min: 1, max: 255}).withMessage('Bio must be between 1 - 255 characters.')
];

module.exports = {
  validateBio,
}
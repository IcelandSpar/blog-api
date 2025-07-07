const { body } = require('express-validator');


const registerValidator = [
  body('username').trim()
    .notEmpty().withMessage('Username must not be empty')
    .isLength({min: 3, max: 18}).withMessage('Username must be between 4 - 18 characters long'),
  body('password').trim()
    .notEmpty().withMessage('Password must not be empty')
    .isLength({min: 3, max: 18})
];

module.exports = {
  registerValidator,
}
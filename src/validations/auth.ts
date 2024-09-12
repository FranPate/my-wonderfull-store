import { check } from 'express-validator'

export const validateCreateUser = [
  check('email')
    .notEmpty()
    .withMessage('The email field cannot be empty.')
    .isEmail()
    .withMessage('Must be a valid email address.'),

  check('password')
    .notEmpty()
    .withMessage('The password field cannot be empty.')
    .isLength({ min: 6 })
    .withMessage('The password must be at least 6 characters long.'),

  check('firstName')
    .notEmpty()
    .withMessage('The firstName field cannot be empty.')
    .isString()
    .withMessage('The firstName field must be a string.'),

  check('lastName')
    .notEmpty()
    .withMessage('The lastName field cannot be empty.')
    .isString()
    .withMessage('The lastName field must be a string.'),

  check('role')
    .notEmpty()
    .withMessage('The role field cannot be empty.')
    .isIn(['admin', 'staff', 'client'])
    .withMessage('The role must be one of the following: admin, staff, client.')
]

export const validateLogin = [
  check('email')
    .isEmail()
    .withMessage('The email address must be a valid email address.'),
  check('password').notEmpty().withMessage('Password cannot be empty.')
]

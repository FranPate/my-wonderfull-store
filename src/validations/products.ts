import { check, param } from 'express-validator'

export const validateProducts = [
  check('products')
    .isArray()
    .withMessage('The products field must be an array of products'),

  check('products.*.title')
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isString()
    .withMessage('Title must be a string'),

  check('products.*.description')
    .notEmpty()
    .withMessage('Description cannot be empty')
    .isString()
    .withMessage('Description must be a string'),

  check('products.*.category')
    .notEmpty()
    .withMessage('Category cannot be empty')
    .isString()
    .withMessage('Category must be a string'),

  check('products.*.price')
    .notEmpty()
    .withMessage('Price cannot be empty')
    .isFloat({ min: 0.01 })
    .withMessage('Price must be a valid float number'),

  check('products.*.stock')
    .notEmpty()
    .withMessage('Stock cannot be empty')
    .isInt({ min: 0 })
    .withMessage('Stock must be a positive integer'),

  check('products.*.thumbnail')
    .notEmpty()
    .withMessage('Thumbnail cannot be empty')
    .isURL()
    .withMessage('Thumbnail must be a valid URL')
]

export const validateProduct = [
  check('title')
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isString()
    .withMessage('Title must be a string'),

  check('description')
    .notEmpty()
    .withMessage('Description cannot be empty')
    .isString()
    .withMessage('Description must be a string'),

  check('category')
    .notEmpty()
    .withMessage('Category cannot be empty')
    .isString()
    .withMessage('Category must be a string'),

  check('price')
    .notEmpty()
    .withMessage('Price cannot be empty')
    .isFloat({ min: 0.01 })
    .withMessage('Price must be a valid float number'),

  check('stock')
    .notEmpty()
    .withMessage('Stock cannot be empty')
    .isInt({ min: 0 })
    .withMessage('Stock must be a positive integer'),

  check('thumbnail')
    .notEmpty()
    .withMessage('Thumbnail cannot be empty')
    .isURL()
    .withMessage('Thumbnail must be a valid URL')
]

export const validateId = [param('id').isInt().withMessage('Invalid ID')]

export const validateTitle = [
  param('title').isString().withMessage('Invalid title')
]

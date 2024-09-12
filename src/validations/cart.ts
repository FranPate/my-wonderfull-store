import { body, check } from 'express-validator'

export const validateCart = [
  check('address')
    .isString()
    .withMessage('La dirección debe ser un texto.')
    .notEmpty()
    .withMessage('La dirección es obligatoria.'),

  check('status')
    .optional()
    .isIn(['pendiente', 'listo', 'enviado'])
    .withMessage('El estado no es válido.'),

  check('items')
    .isArray({ min: 1 })
    .withMessage('Debe haber al menos un item en el carrito.'),

  body('items.*.title')
    .isString()
    .withMessage('El título del producto debe ser un texto.')
    .notEmpty()
    .withMessage('El título del producto es obligatorio.'),

  body('items.*.quantity')
    .isInt({ gt: 0 })
    .withMessage('La cantidad debe ser un número entero positivo.')
]

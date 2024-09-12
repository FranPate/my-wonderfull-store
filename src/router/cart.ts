import { Router } from 'express'
import { createCart, deleteCartFromUser } from '../handlers/cart'
import { validateCart } from '../validations/cart'
import { validateId } from '../validations/products'
import { handleInputErrors } from '../middleware/errors.middleware'

const router = Router()

/**
 * @swagger
 * components:
 *    schemas:
 *        Cart:
 *          type: object
 *          properties:
 *              address:
 *                  type: string
 *                  description: The address to deliver
 *                  example: Av. Libertador 1400
 *              status:
 *                  type: string
 *                  description: The cart status
 *                  example: pending
 *              userUuid:
 *                  type: string
 *                  description: The user uuid
 *                  example: 4d847f0b-3e0f-458a-b37e-8835baf8b7c3
 */

/**
 * @swagger
 * components:
 *    schemas:
 *        CartItem:
 *          type: object
 *          properties:
 *              cartId:
 *                  type: number
 *                  description: The cart ID related to
 *                  example: 2
 *              productId:
 *                  type: number
 *                  description: The product status
 *                  example: 3
 *              quantity:
 *                  type: number
 *                  description: The quantity for the product
 *                  example: 5
 */

router.route('/').post(validateCart, handleInputErrors, createCart)

router.route('/:id').delete(validateId, handleInputErrors, deleteCartFromUser)

export default router

import { Router } from 'express'
import {
  addProductToStore,
  addProductsToStore,
  deleteProductById,
  getProductById,
  getProductByName,
  getProductsFromStore,
  updateProductById,
  updateProductStockById
} from '../handlers/products'
import {
  validateProducts,
  validateProduct,
  validateId,
  validateTitle
} from '../validations/products'
import { handleInputErrors } from '../middleware/errors.middleware'
import { verifyToken } from '../middleware/auth.middleware'

const router = Router()

/**
 * @swagger
 * components:
 *    schemas:
 *        Product:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *                  description: The product name
 *                  example: Red Lipstick
 *              description:
 *                  type: string
 *                  description: The product description
 *                  example: The Red Lipstick is a classic and bold choice for adding a pop of color to your lips.
 *              category:
 *                  type: string
 *                  description: The product category
 *                  example: beauty
 *              price:
 *                  type: float
 *                  description: The product price
 *                  example: 9.99
 *              stock:
 *                  type: integer
 *                  description: The product stock
 *                  example: 8
 *              thumbnail:
 *                  type: string
 *                  description: The product thumbnail link
 *                  example: "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png"
 */

router
  .route('/product')
  .post(verifyToken, validateProduct, handleInputErrors, addProductToStore)

router
  .route('/products')
  .get(getProductsFromStore)
  .post(verifyToken, validateProducts, handleInputErrors, addProductsToStore)

router
  .route('/product/get/:id')
  .get(validateId, handleInputErrors, getProductById)

router
  .route('/product/id/:id')
  .put(verifyToken, validateId, handleInputErrors, updateProductById)
  .delete(verifyToken, validateId, handleInputErrors, deleteProductById)
  .patch(verifyToken, validateId, handleInputErrors, updateProductStockById)

router
  .route('/product/search/:title')
  .get(validateTitle, handleInputErrors, getProductByName)

export default router

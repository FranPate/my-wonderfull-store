import { Router } from 'express'
import { createUser, loginUser } from '../handlers/auth'
import { validateCreateUser, validateLogin } from '../validations/auth'
import { handleInputErrors } from '../middleware/errors.middleware'

const router = Router()

/**
 * @swagger
 * components:
 *    schemas:
 *        User:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: The user email
 *                  example: test@test.com
 *              password:
 *                  type: string
 *                  description: The user password
 *                  example: test1234
 *              firstName:
 *                  type: string
 *                  description: The user first name
 *                  example: juan
 *              lastName:
 *                  type: string
 *                  description: The user last name
 *                  example: perez
 *              role:
 *                  type: string
 *                  description: The user stock
 *                  example: client
 *              visibility:
 *                  type: string
 *                  description: The user visibility
 *                  example: true
 */

router.route('/login').post(validateLogin, handleInputErrors, loginUser)

router.route('/signup').post(validateCreateUser, handleInputErrors, createUser)

export default router

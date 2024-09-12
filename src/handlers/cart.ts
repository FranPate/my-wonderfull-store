import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import {
  addCart,
  addCartitem,
  deleteCart,
  getCartWithId
} from '../controllers/cart'
import dotenv from 'dotenv'

dotenv.config()

export const createCart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }
    const decoded = verify(token, process.env.MASTERPASSWORD) as {
      uuid: string
    }

    let userUuid = decoded.uuid

    let savedCart = await addCart(userUuid, req.body)
    let savedItems = await addCartitem(req.body.items, savedCart.id)
    return res.status(201).json({ data: savedCart, savedItems })
  } catch (error) {
    return res.status(404).json({ error })
  }
}

export const deleteCartFromUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let cart = await getCartWithId(parseInt(req.params.id))
    if (!cart) {
      return res.status(404).json({ message: 'Product not found' })
    }
    let deletedCart = await deleteCart(cart)
    res.status(200).json({ data: deletedCart })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

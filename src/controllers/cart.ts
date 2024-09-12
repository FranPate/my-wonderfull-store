import Cart from '../models/Cart.model'
import CartItem from '../models/CartItem.model'
import { getProductWithTitle } from './products'

interface CartItemInput {
  title: string
  quantity: number
}

export const addCart = async (userUuid: string, cart: Cart): Promise<Cart> => {
  let newCart = {
    address: cart.address,
    status: cart.status,
    userUuid: userUuid
  }
  return new Promise(async (resolve, reject) => {
    try {
      let savedCart = await Cart.create(newCart)
      return resolve(savedCart)
    } catch (error) {
      return reject(error)
    }
  })
}

export const addCartitem = async (
  items: [],
  cartId: number
): Promise<CartItem[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const savedCartItems = await Promise.all(
        items.map(async (item: CartItemInput) => {
          let product = await getProductWithTitle(item.title)
          let cartItem = {
            cartId: cartId,
            productId: product.id,
            quantity: item.quantity
          }
          return await CartItem.create(cartItem)
        })
      )
      return resolve(savedCartItems)
    } catch (error) {
      return reject(error)
    }
  })
}

export const getCartWithId = async (cartId: number): Promise<Cart> => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await Cart.findOne({ where: { id: cartId } })
      return resolve(product)
    } catch (error) {
      return reject(error)
    }
  })
}

export const deleteCart = async (cart: Cart): Promise<Cart> => {
  return new Promise(async (resolve, reject) => {
    try {
      await cart.destroy()
      return resolve(cart)
    } catch (err) {
      return reject(err)
    }
  })
}

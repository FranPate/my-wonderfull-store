import { Request, Response } from 'express'
import {
  addProduct,
  addProducts,
  deleteProduct,
  getProducts,
  getProductWithId,
  getProductWithTitle,
  updateProduct,
  updateProductStock
} from '../controllers/products'

export const getProductsFromStore = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let products = await getProducts()
    res.status(200).json({ data: products })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const getProductByName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let product = await getProductWithTitle(req.params.title)
    res.status(200).json({ data: product })
  } catch (error) {
    return res.status(404).json({ error })
  }
}

export const getProductById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let product = await getProductWithId(parseInt(req.params.id))
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json({ data: product })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const addProductToStore = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let savedProduct = await addProduct(req.body)
    console.log(savedProduct)
    res.status(201).json({ data: savedProduct })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const addProductsToStore = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let products = req.body.products
    console.log(products)
    let savedProducts = await addProducts(products)
    res.status(201).json({ data: savedProducts })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const updateProductById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let product = await getProductWithId(parseInt(req.params.id))
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    let updatedProduct = await updateProduct(product, req.body)
    res.status(200).json({ data: updatedProduct })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const deleteProductById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let product = await getProductWithId(parseInt(req.params.id))
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    let deletedProduct = await deleteProduct(product)
    res.status(200).json({ data: deletedProduct })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const updateProductStockById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let product = await getProductWithId(parseInt(req.params.id))
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    let updatedProductStock = await updateProductStock(product, req.body.stock)
    res.status(200).json({ data: updatedProductStock })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

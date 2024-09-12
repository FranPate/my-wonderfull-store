import Product from '../models/Product.model'

interface UpdateProductBody {
  title?: string
  description?: string
  category?: string
  price?: number
  stock?: number
  thumbnail?: string
}

export const addProducts = async (products: Product[]): Promise<Product[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const savedProducts = await Promise.all(
        products.map(async (product: Omit<Product, 'id'>) => {
          return await Product.create(product)
        })
      )
      return resolve(savedProducts)
    } catch (error) {
      return reject(error)
    }
  })
}

export const addProduct = async (
  product: Omit<Product, 'id'>
): Promise<Product> => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(product)
      let savedProduct = await Product.create(product)
      console.log('savedProduct')
      console.log(savedProduct)
      return resolve(savedProduct)
    } catch (error) {
      return reject(error)
    }
  })
}

export const getProducts = async (): Promise<Product[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await Product.findAll({
        order: [['id', 'DESC']]
      })

      if (products.length > 0) {
        return resolve(products)
      } else {
        return resolve([])
      }
    } catch (error) {
      return reject(error)
    }
  })
}

export const getProductWithId = async (productId: number): Promise<Product> => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await Product.findOne({ where: { id: productId } })
      return resolve(product)
    } catch (error) {
      return reject(error)
    }
  })
}

export const getProductWithTitle = async (
  productTitle: string
): Promise<Product> => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await Product.findOne({ where: { title: productTitle } })
      if (!product) {
        return reject('Product not found')
      }
      return resolve(product)
    } catch (error) {
      console.log(error)
      return reject(error)
    }
  })
}

export const updateProduct = async (
  product: Product,
  body: UpdateProductBody
): Promise<Product> => {
  return new Promise(async (resolve, reject) => {
    try {
      await product.update(body)
      await product.save()
      return resolve(product)
    } catch (err) {
      return reject(err)
    }
  })
}

export const deleteProduct = async (product: Product): Promise<Product> => {
  return new Promise(async (resolve, reject) => {
    try {
      await product.destroy()
      return resolve(product)
    } catch (err) {
      return reject(err)
    }
  })
}

export const updateProductStock = async (
  product: Product,
  stock: number
): Promise<Product> => {
  return new Promise(async (resolve, reject) => {
    try {
      product.stock = stock
      await product.save()
      return resolve(product)
    } catch (err) {
      return reject(err)
    }
  })
}

import request from 'supertest'
import server from '../../server'

let adminToken: string
let staffToken: string
let clientToken: string

beforeAll(async () => {
  await request(server).post('/auth/signup').send({
    email: 'adminproducttest@test.com',
    password: 'test1234',
    firstName: 'test',
    lastName: 'test',
    role: 'admin',
    visibility: true
  })
  const adminResponse = await request(server).post('/auth/login').send({
    email: 'adminproducttest@test.com',
    password: 'test1234'
  })

  adminToken = adminResponse.body.token

  await request(server).post('/auth/signup').send({
    email: 'staffproducttest@test.com',
    password: 'test1234',
    firstName: 'test',
    lastName: 'test',
    role: 'staff',
    visibility: true
  })
  const staffResponse = await request(server).post('/auth/login').send({
    email: 'staffproducttest@test.com',
    password: 'test1234'
  })

  staffToken = staffResponse.body.token

  await request(server).post('/auth/signup').send({
    email: 'clientproducttest@test.com',
    password: 'test1234',
    firstName: 'test',
    lastName: 'test',
    role: 'client',
    visibility: true
  })
  const clientResponse = await request(server).post('/auth/login').send({
    email: 'clientproducttest@test.com',
    password: 'test1234'
  })

  clientToken = clientResponse.body.token
}, 30000)

describe('POST /products/product', () => {
  it('Should display product validation input errors', async () => {
    const response = await request(server)
      .post('/products/product')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(12)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(5)
  })

  it('Should display user unauthorized', async () => {
    const response = await request(server)
      .post('/products/product')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({})
    expect(response.status).toBe(403)
    expect(response.status).not.toBe(400)
  })

  it('Should display product validation input errors', async () => {
    const response = await request(server)
      .post('/products/product')
      .set('Authorization', `Bearer ${staffToken}`)
      .send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(12)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(5)
  })

  it('Should add a product ', async () => {
    const response = await request(server)
      .post('/products/product')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Essence Mascara Lash Princess',
        description:
          'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
        category: 'beauty',
        price: 9.99,
        stock: 5,
        thumbnail:
          'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png'
      })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(401)
  })
})

describe('POST /products/products', () => {
  it('Should display product validation input errors', async () => {
    const response = await request(server)
      .post('/products/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })

  it('Should display user unauthorized', async () => {
    const response = await request(server)
      .post('/products/products')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({})
    expect(response.status).toBe(403)
    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(401)
  })

  it('Should display product validation input errors', async () => {
    const response = await request(server)
      .post('/products/products')
      .set('Authorization', `Bearer ${staffToken}`)
      .send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })

  it('Should add products ', async () => {
    const response = await request(server)
      .post('/products/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        products: [
          {
            title: 'Eyeshadow Palette with Mirror',
            description:
              "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
            category: 'beauty',
            price: 19.99,
            stock: 44,
            thumbnail:
              'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png'
          },
          {
            title: 'Powder Canister',
            description:
              'The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.',
            category: 'beauty',
            price: 12.99,
            stock: 59,
            thumbnail:
              'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png'
          }
        ]
      })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(401)
  })
})

describe('GET /products/product/search/:title', () => {
  it('Should a JSON response with products ', async () => {
    const response = await request(server)
      .get('/products/product/search/Eyeshadow Palette with Mirror')
      .set('Authorization', `Bearer ${clientToken}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
  })

  it('Should a JSON response with products ', async () => {
    const response = await request(server)
      .get('/products/product/search/Eyeshadow Palette with Mirror')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
  })

  it('Should a JSON response with products ', async () => {
    const response = await request(server)
      .get('/products/product/search/Eyeshadow Palette with Mirror')
      .set('Authorization', `Bearer ${staffToken}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
  })

  it('Should return a 404 product not found', async () => {
    const response = await request(server)
      .get('/products/product/search/not-valid-url')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(response.status).toBe(404)
    expect(response.status).not.toBe(400)
  })
})

describe('GET /products/product/:id', () => {
  it('Should display user unauthorized', async () => {
    const response = await request(server)
      .get('/products/product/1')
      .set('Authorization', `Bearer ${clientToken}`)
    expect(response.status).toBe(403)
    expect(response.status).not.toBe(401)
    expect(response.status).not.toBe(404)
  })

  it('Should a JSON response with products ', async () => {
    const response = await request(server)
      .get('/products/product/1')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
  })

  it('Should a JSON response with products ', async () => {
    const response = await request(server)
      .get('/products/product/1')
      .set('Authorization', `Bearer ${staffToken}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
  })

  it('Should return a 404 product not found', async () => {
    const response = await request(server)
      .get('/products/product/1000')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(response.status).toBe(404)
    expect(response.status).not.toBe(400)
  })

  it('Should check a valid id', async () => {
    const response = await request(server)
      .get('/products/product/not-valid-url')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.status).not.toBe(404)
  })
})

describe('PUT /products/product/:id', () => {
  it('Should display user unauthorized', async () => {
    const response = await request(server)
      .put('/products/product/3')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({})
    expect(response.status).toBe(403)
    expect(response.status).not.toBe(401)
    expect(response.status).not.toBe(404)
  })

  it('Should update a product ', async () => {
    const response = await request(server)
      .put('/products/product/3')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Test',
        description: 'Test',
        category: 'Test',
        price: 8,
        stock: 10000
      })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(401)
  })

  it('Should update a product ', async () => {
    const response = await request(server)
      .put('/products/product/3')
      .set('Authorization', `Bearer ${staffToken}`)
      .send({
        title: 'Test',
        description: 'Test',
        category: 'Test',
        price: 8,
        stock: 10000
      })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(401)
  })

  it('Should return a 404 product not found', async () => {
    const response = await request(server)
      .put('/products/product/1000')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Test',
        description: 'Test',
        category: 'Test',
        price: 8,
        stock: 10000
      })
    expect(response.status).toBe(404)
    expect(response.status).not.toBe(400)
  })

  it('Should check a valid id', async () => {
    const response = await request(server)
      .put('/products/product/not-valid-url')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Test',
        description: 'Test',
        category: 'Test',
        price: 8,
        stock: 10000
      })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.status).not.toBe(404)
  })
})

describe('DELETE /products/product/:id', () => {
  it('Should display user unauthorized', async () => {
    const response = await request(server)
      .delete('/products/product/1')
      .set('Authorization', `Bearer ${clientToken}`)
    expect(response.status).toBe(403)
    expect(response.status).not.toBe(401)
    expect(response.status).not.toBe(404)
  })

  it('Should delete a product', async () => {
    const response = await request(server)
      .delete('/products/product/1')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
  })

  it('Should delete a product', async () => {
    const response = await request(server)
      .delete('/products/product/2')
      .set('Authorization', `Bearer ${staffToken}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
  })

  it('Should return a 404 product not found', async () => {
    const response = await request(server)
      .delete('/products/product/1000')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(response.status).toBe(404)
    expect(response.status).not.toBe(400)
  })

  it('Should check a valid id', async () => {
    const response = await request(server)
      .delete('/products/product/not-valid-url')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.status).not.toBe(404)
  })
})

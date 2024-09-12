import request from 'supertest'
import server from '../../server'

let adminToken: string
let staffToken: string
let clientToken: string

beforeAll(async () => {
  await request(server).post('/auth/signup').send({
    email: 'admincarttest@test.com',
    password: 'test1234',
    firstName: 'test',
    lastName: 'test',
    role: 'admin',
    visibility: true
  })
  const adminResponse = await request(server).post('/auth/login').send({
    email: 'admincarttest@test.com',
    password: 'test1234'
  })

  adminToken = adminResponse.body.token

  await request(server).post('/auth/signup').send({
    email: 'staffcarttest@test.com',
    password: 'test1234',
    firstName: 'test',
    lastName: 'test',
    role: 'staff',
    visibility: true
  })
  const staffResponse = await request(server).post('/auth/login').send({
    email: 'staffcarttest@test.com',
    password: 'test1234'
  })

  staffToken = staffResponse.body.token

  await request(server).post('/auth/signup').send({
    email: 'clientcarttest@test.com',
    password: 'test1234',
    firstName: 'test',
    lastName: 'test',
    role: 'client',
    visibility: true
  })
  const clientResponse = await request(server).post('/auth/login').send({
    email: 'clientcarttest@test.com',
    password: 'test1234'
  })

  clientToken = clientResponse.body.token

  await request(server)
    .post('/products/products')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({
      products: [
        {
          title: 'Red Lipstick',
          description:
            'The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.',
          category: 'beauty',
          price: 12.99,
          stock: 68,
          thumbnail:
            'https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png',
          images: [
            'https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png'
          ]
        },
        {
          title: 'Red Nail Polish',
          description:
            'The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.',
          category: 'beauty',
          price: 8.99,
          stock: 71,
          thumbnail:
            'https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png',
          images: [
            'https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/1.png'
          ]
        }
      ]
    })
}, 30000)

describe('POST /cart', () => {
  it('Should display cart validation input errors', async () => {
    const response = await request(server)
      .post('/cart')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')

    expect(response.status).not.toBe(404)
  })

  it('Should display cart validation input errors', async () => {
    const response = await request(server)
      .post('/cart')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')

    expect(response.status).not.toBe(404)
  })

  it('Should display cart validation input errors', async () => {
    const response = await request(server)
      .post('/cart')
      .set('Authorization', `Bearer ${staffToken}`)
      .send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')

    expect(response.status).not.toBe(404)
  })

  it('Should add a cart ', async () => {
    const response = await request(server)
      .post('/cart')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({
        address: 'Maipu 251',
        items: [
          {
            title: 'Red Lipstick',
            quantity: 3
          },
          {
            title: 'Red Nail Polish',
            quantity: 1
          }
        ]
      })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(401)
  })

  it('Should display 404 not found', async () => {
    const response = await request(server)
      .post('/cart')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({
        address: 'Maipu 251',
        items: [
          {
            title: 'Not Valid Produt',
            quantity: 3
          },
          {
            title: 'Red Nail Polish',
            quantity: 1
          }
        ]
      })
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('error')

    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(401)
  })
})

describe('DELETE /cart/:id', () => {
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

  it('Should delete a product', async () => {
    const response = await request(server)
      .delete('/cart/1')
      .set('Authorization', `Bearer ${clientToken}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(404)
  })
})

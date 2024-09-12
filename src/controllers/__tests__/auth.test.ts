import request from 'supertest'
import server from '../../server'

describe('POST /auth/signup', () => {
  it('Should display signup validation input errors', async () => {
    const response = await request(server).post('/auth/signup').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(11)

    expect(response.status).not.toBe(404)
  })

  it('Should add an admin user correctly', async () => {
    const response = await request(server).post('/auth/signup').send({
      email: 'test@test.com',
      password: 'test1234',
      firstName: 'test',
      lastName: 'test',
      role: 'admin',
      visibility: true
    })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(401)
  })

  it('Should add an staff user correctly', async () => {
    const response = await request(server).post('/auth/signup').send({
      email: 'staff@staff.com',
      password: 'staff1234',
      firstName: 'staff',
      lastName: 'staff',
      role: 'staff',
      visibility: true
    })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(401)
  })

  it('Should add an client user correctly', async () => {
    const response = await request(server).post('/auth/signup').send({
      email: 'client@client.com',
      password: 'client1234',
      firstName: 'client',
      lastName: 'client',
      role: 'client',
      visibility: true
    })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('data')

    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(401)
  })

  it('Should display email is already on use', async () => {
    const response = await request(server).post('/auth/signup').send({
      email: 'test@test.com',
      password: 'test1234',
      firstName: 'test',
      lastName: 'test',
      role: 'admin',
      visibility: true
    })
    expect(response.status).toBe(409)
    expect(response.body).toHaveProperty('message')

    expect(response.status).not.toBe(404)
  })
})

describe('POST /auth/login', () => {
  it('Should display signup validation input errors', async () => {
    const response = await request(server).post('/auth/login').send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body.errors).toHaveLength(2)

    expect(response.status).not.toBe(404)
  })

  it('Should login correctly and recieve token', async () => {
    const response = await request(server).post('/auth/login').send({
      email: 'test@test.com',
      password: 'test1234'
    })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')

    expect(response.status).not.toBe(400)
    expect(response.status).not.toBe(401)
  })

  it('Should display invalid passowrd', async () => {
    const response = await request(server).post('/auth/login').send({
      email: 'test@test.com',
      password: 'test'
    })
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')

    expect(response.status).not.toBe(404)
  })

  it('Should display user not found', async () => {
    const response = await request(server).post('/auth/login').send({
      email: 'test@tes.com',
      password: 'test1234'
    })
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error')

    expect(response.status).not.toBe(404)
  })
})

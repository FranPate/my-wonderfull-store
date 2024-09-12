import express from 'express'
import authRoutes from './router/auth'
import cartRoutes from './router/cart'
import productsRoutes from './router/products'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
import { connectDB } from './config/db'
import { setupMiddlewares } from './middleware/middlewares'
import cors, { CorsOptions } from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'

dotenv.config()

const server = express()

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin == process.env.FRONTEND_URL) {
      callback(null, true)
    } else {
      callback(new Error('Error de CORS'))
    }
  }
}
server.use(cors(corsOptions))

setupMiddlewares(server)
connectDB()
server.use(morgan('dev'))
// Routing
server.use('/auth', authRoutes)
server.use('/cart', cartRoutes)
server.use('/products', productsRoutes)
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server

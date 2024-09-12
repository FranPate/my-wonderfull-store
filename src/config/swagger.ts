import swaggerJSDoc from 'swagger-jsdoc'

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    tags: [
      {
        name: 'Products',
        description: 'API operations related to products'
      },
      {
        name: 'Auth',
        description: 'API operations related to auth'
      },
      {
        name: 'Cart',
        description: 'API operations related to cart'
      }
    ],
    info: {
      title: 'REST API Node.js / Express / Typescript',
      version: '1.0.0',
      description: 'API docs for products'
    }
  },
  apis: ['./src/router/*.ts']
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec

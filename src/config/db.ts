import { Sequelize } from 'sequelize-typescript'
import colors from 'colors'
import dotenv from 'dotenv'

dotenv.config()

export const db = new Sequelize(process.env.DATABASE_URL, {
  models: [__dirname + '/../models/**/*'],
  logging: false
})

export async function connectDB(): Promise<void> {
  try {
    await db.authenticate()
    await db.sync()
    console.log(colors.blue('Database connection successful'))
  } catch (error) {
    console.log(colors.red.bold('There was an error with the database'))
  }
}

import express, { Express } from 'express'
import { init, protectWithJwt } from './auth.middleware'

export const setupMiddlewares = (server: Express): void => {
  server.use(express.json())
  init()
  server.use(protectWithJwt)
}

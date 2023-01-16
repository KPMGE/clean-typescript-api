import express from 'express'
import { setupMiddlewares } from './middlewares'
import { setupRoutes } from './routes'

const app = express()
setupRoutes(app)
setupMiddlewares(app)

export { app }

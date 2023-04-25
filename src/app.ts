import express from 'express'
import { router } from './routes'
import { corsMiddlewares } from './middlewares/cors'

const app = express()
app.use(express.json())
app.use(corsMiddlewares)
app.use(router)

export { app }

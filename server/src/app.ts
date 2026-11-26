import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { apiRouter } from './routes'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'
import { apiRateLimiter } from './middleware/rateLimiter'
import { env, isProduction } from './utils/env'

export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  app.set('trust proxy', 1)
  app.use(helmet())
  app.use(
    cors({
      origin: env.clientOrigin,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
  )
  const defaultJson = express.json({ limit: '100kb' })
  // The photo upload route installs its own, larger JSON parser.
  app.use((req, res, next) => (req.path === '/api/profile/photo' ? next() : defaultJson(req, res, next)))
  app.use(morgan(isProduction ? 'combined' : 'dev'))
  app.use('/api', apiRateLimiter, apiRouter)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}

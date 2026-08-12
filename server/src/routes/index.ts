import { Router } from 'express'
import { healthRouter } from './health.routes'
import { projectRouter } from './project.routes'
import { contactRouter } from './contact.routes'

export const apiRouter = Router()

apiRouter.use('/health', healthRouter)
apiRouter.use('/projects', projectRouter)
apiRouter.use('/contact', contactRouter)

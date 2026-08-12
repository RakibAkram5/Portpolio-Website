import { Router } from 'express'
import { healthRouter } from './health.routes'
import { projectRouter } from './project.routes'
import { contactRouter } from './contact.routes'
import { authRouter } from './auth.routes'
import { skillRouter } from './skill.routes'
import { serviceRouter } from './service.routes'
import { timelineRouter } from './timeline.routes'
import { profileRouter } from './profile.routes'

export const apiRouter = Router()

apiRouter.use('/health', healthRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/projects', projectRouter)
apiRouter.use('/contact', contactRouter)
apiRouter.use('/skills', skillRouter)
apiRouter.use('/services', serviceRouter)
apiRouter.use('/timeline', timelineRouter)
apiRouter.use('/profile', profileRouter)

import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { requireAuth } from '../middleware/requireAuth'
import { getProject, getProjects, postProject, putProject, removeProject } from '../controllers/project.controller'

export const projectRouter = Router()

projectRouter.get('/', asyncHandler(getProjects))
projectRouter.post('/', requireAuth, asyncHandler(postProject))
projectRouter.put('/:id', requireAuth, asyncHandler(putProject))
projectRouter.delete('/:id', requireAuth, asyncHandler(removeProject))
projectRouter.get('/:slug', asyncHandler(getProject))

import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { getProject, getProjects } from '../controllers/project.controller'

export const projectRouter = Router()

projectRouter.get('/', asyncHandler(getProjects))
projectRouter.get('/:slug', asyncHandler(getProject))

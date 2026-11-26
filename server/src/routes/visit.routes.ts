import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { requireAuth } from '../middleware/requireAuth'
import { getVisitStatsHandler, postVisit } from '../controllers/visit.controller'

export const visitRouter = Router()

visitRouter.post('/', asyncHandler(postVisit))
visitRouter.get('/stats', requireAuth, asyncHandler(getVisitStatsHandler))

import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { requireAuth } from '../middleware/requireAuth'
import { getProfileHandler, putProfile } from '../controllers/profile.controller'

export const profileRouter = Router()

profileRouter.get('/', asyncHandler(getProfileHandler))
profileRouter.put('/', requireAuth, asyncHandler(putProfile))

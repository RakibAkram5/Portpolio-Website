import express, { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { requireAuth } from '../middleware/requireAuth'
import {
  deleteProfilePhoto,
  getProfileHandler,
  getProfilePhotoHandler,
  putProfile,
  putProfilePhoto,
} from '../controllers/profile.controller'

export const profileRouter = Router()

profileRouter.get('/', asyncHandler(getProfileHandler))
profileRouter.put('/', requireAuth, asyncHandler(putProfile))

profileRouter.get('/photo', asyncHandler(getProfilePhotoHandler))
// Larger body limit only for the photo upload (base64 inflates a 2 MB image to ~2.7 MB).
profileRouter.put('/photo', requireAuth, express.json({ limit: '3mb' }), asyncHandler(putProfilePhoto))
profileRouter.delete('/photo', requireAuth, asyncHandler(deleteProfilePhoto))

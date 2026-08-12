import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { contactRateLimiter } from '../middleware/rateLimiter'
import { submitContactMessage } from '../controllers/contact.controller'

export const contactRouter = Router()

contactRouter.post('/', contactRateLimiter, asyncHandler(submitContactMessage))

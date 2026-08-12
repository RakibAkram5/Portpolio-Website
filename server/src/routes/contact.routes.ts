import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { requireAuth } from '../middleware/requireAuth'
import { contactRateLimiter } from '../middleware/rateLimiter'
import { getContactMessages, removeContactMessage, submitContactMessage } from '../controllers/contact.controller'

export const contactRouter = Router()

contactRouter.post('/', contactRateLimiter, asyncHandler(submitContactMessage))
contactRouter.get('/', requireAuth, asyncHandler(getContactMessages))
contactRouter.delete('/:id', requireAuth, asyncHandler(removeContactMessage))

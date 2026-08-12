import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { requireAuth } from '../middleware/requireAuth'
import { loginRateLimiter } from '../middleware/rateLimiter'
import { login, me } from '../controllers/auth.controller'

export const authRouter = Router()

authRouter.post('/login', loginRateLimiter, asyncHandler(login))
authRouter.get('/me', requireAuth, me)

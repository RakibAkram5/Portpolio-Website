import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { requireAuth } from '../middleware/requireAuth'
import { getServices, postService, putService, removeService } from '../controllers/service.controller'

export const serviceRouter = Router()

serviceRouter.get('/', asyncHandler(getServices))
serviceRouter.post('/', requireAuth, asyncHandler(postService))
serviceRouter.put('/:id', requireAuth, asyncHandler(putService))
serviceRouter.delete('/:id', requireAuth, asyncHandler(removeService))

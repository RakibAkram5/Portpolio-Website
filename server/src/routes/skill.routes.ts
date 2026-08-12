import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { requireAuth } from '../middleware/requireAuth'
import { getSkills, postSkill, putSkill, removeSkill } from '../controllers/skill.controller'

export const skillRouter = Router()

skillRouter.get('/', asyncHandler(getSkills))
skillRouter.post('/', requireAuth, asyncHandler(postSkill))
skillRouter.put('/:id', requireAuth, asyncHandler(putSkill))
skillRouter.delete('/:id', requireAuth, asyncHandler(removeSkill))

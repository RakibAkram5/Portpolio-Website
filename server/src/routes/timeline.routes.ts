import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { requireAuth } from '../middleware/requireAuth'
import {
  getTimelineItems,
  postTimelineItem,
  putTimelineItem,
  removeTimelineItem,
} from '../controllers/timeline.controller'

export const timelineRouter = Router()

timelineRouter.get('/', asyncHandler(getTimelineItems))
timelineRouter.post('/', requireAuth, asyncHandler(postTimelineItem))
timelineRouter.put('/:id', requireAuth, asyncHandler(putTimelineItem))
timelineRouter.delete('/:id', requireAuth, asyncHandler(removeTimelineItem))

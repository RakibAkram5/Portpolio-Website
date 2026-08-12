import type { Request, Response } from 'express'
import { ApiError } from '../utils/ApiError'
import { timelineItemSchema, timelineItemUpdateSchema } from '../validators/timeline.validator'
import {
  createTimelineItem,
  deleteTimelineItem,
  getTimelineItemById,
  listTimelineItems,
  updateTimelineItem,
} from '../services/timeline.service'

export async function getTimelineItems(_req: Request, res: Response) {
  const items = await listTimelineItems()
  res.status(200).json({ success: true, data: items })
}

export async function postTimelineItem(req: Request, res: Response) {
  const input = timelineItemSchema.parse(req.body)
  const item = await createTimelineItem(input)
  res.status(201).json({ success: true, data: item })
}

export async function putTimelineItem(req: Request<{ id: string }>, res: Response) {
  const existing = await getTimelineItemById(req.params.id)
  if (!existing) throw new ApiError(404, 'Timeline item not found.')

  const input = timelineItemUpdateSchema.parse(req.body)
  const item = await updateTimelineItem(req.params.id, input)
  res.status(200).json({ success: true, data: item })
}

export async function removeTimelineItem(req: Request<{ id: string }>, res: Response) {
  const existing = await getTimelineItemById(req.params.id)
  if (!existing) throw new ApiError(404, 'Timeline item not found.')

  await deleteTimelineItem(req.params.id)
  res.status(200).json({ success: true, message: 'Timeline item deleted.' })
}

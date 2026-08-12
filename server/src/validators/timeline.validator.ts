import { z } from 'zod'

export const timelineTrackEnum = z.enum(['JOURNEY', 'CAREER'])

export const timelineItemSchema = z.object({
  track: timelineTrackEnum,
  year: z.string().trim().min(1).max(40),
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(500),
  order: z.number().int().default(0),
})

export const timelineItemUpdateSchema = timelineItemSchema.partial()

export type TimelineItemInput = z.infer<typeof timelineItemSchema>
export type TimelineItemUpdateInput = z.infer<typeof timelineItemUpdateSchema>

import { prisma } from '../utils/prisma'
import type { TimelineItemInput, TimelineItemUpdateInput } from '../validators/timeline.validator'

export async function listTimelineItems() {
  return prisma.timelineItem.findMany({ orderBy: [{ track: 'asc' }, { order: 'asc' }] })
}

export async function getTimelineItemById(id: string) {
  return prisma.timelineItem.findUnique({ where: { id } })
}

export async function createTimelineItem(input: TimelineItemInput) {
  return prisma.timelineItem.create({ data: input })
}

export async function updateTimelineItem(id: string, input: TimelineItemUpdateInput) {
  return prisma.timelineItem.update({ where: { id }, data: input })
}

export async function deleteTimelineItem(id: string) {
  return prisma.timelineItem.delete({ where: { id } })
}

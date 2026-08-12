import { z } from 'zod'

export const serviceSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(400),
  icon: z.string().trim().min(1).max(50),
  order: z.number().int().default(0),
})

export const serviceUpdateSchema = serviceSchema.partial()

export type ServiceInput = z.infer<typeof serviceSchema>
export type ServiceUpdateInput = z.infer<typeof serviceUpdateSchema>

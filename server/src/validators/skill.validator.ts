import { z } from 'zod'

export const skillCategoryEnum = z.enum(['Frontend', 'Backend', 'Database', 'Mobile', 'Tools'])
export const skillLevelEnum = z.enum(['Beginner', 'Intermediate', 'Advanced'])

export const skillSchema = z.object({
  name: z.string().trim().min(1).max(80),
  category: skillCategoryEnum,
  description: z.string().trim().min(1).max(300),
  level: skillLevelEnum,
  icon: z.string().trim().min(1).max(50),
  order: z.number().int().default(0),
})

export const skillUpdateSchema = skillSchema.partial()

export type SkillInput = z.infer<typeof skillSchema>
export type SkillUpdateInput = z.infer<typeof skillUpdateSchema>

import { z } from 'zod'

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const projectSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: z.string().trim().toLowerCase().regex(slugPattern, 'Slug must be lowercase, alphanumeric, and hyphen-separated.'),
  tagline: z.string().trim().max(200).default(''),
  description: z.string().trim().min(10).max(4000),
  problem: z.string().trim().max(4000).default(''),
  architecture: z.string().trim().max(4000).default(''),
  image: z.string().trim().min(1).max(500),
  screenshots: z.array(z.string().trim()).default([]),
  githubUrl: z.string().trim().url(),
  liveUrl: z.string().trim().url().nullable().optional(),
  tech: z.array(z.string().trim()).min(1),
  features: z.array(z.string().trim()).default([]),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
})

export const projectUpdateSchema = projectSchema.partial()

export type ProjectInput = z.infer<typeof projectSchema>
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>

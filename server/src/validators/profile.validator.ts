import { z } from 'zod'

const statSchema = z.object({
  value: z.string().trim().min(1).max(30),
  label: z.string().trim().min(1).max(80),
})

export const profileSchema = z.object({
  name: z.string().trim().min(1).max(100),
  role: z.string().trim().min(1).max(150),
  roles: z.array(z.string().trim()).min(1),
  tagline: z.string().trim().min(1).max(200),
  intro: z.string().trim().min(1).max(1000),
  email: z.string().trim().email(),
  location: z.string().trim().min(1).max(100),
  resumeUrl: z.string().trim().min(1).max(500),
  githubUsername: z.string().trim().min(1).max(100),
  githubUrl: z.string().trim().url(),
  linkedinUrl: z.string().trim().url(),
  aboutHeading: z.string().trim().min(1).max(150),
  aboutParagraphs: z.array(z.string().trim().min(1)).min(1),
  stats: z.array(statSchema).min(1),
})

export const profileUpdateSchema = profileSchema.partial()

export type ProfileInput = z.infer<typeof profileSchema>
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>

import { z } from 'zod'

export const contactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(100, 'Name must be under 100 characters.'),
  email: z.string().trim().email('Please provide a valid email address.').max(200),
  subject: z
    .string()
    .trim()
    .min(3, 'Subject must be at least 3 characters.')
    .max(200, 'Subject must be under 200 characters.'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters.')
    .max(5000, 'Message must be under 5000 characters.'),
})

export type ContactMessageInput = z.infer<typeof contactMessageSchema>

import type { Request, Response } from 'express'
import { contactMessageSchema } from '../validators/contact.validator'
import { createContactMessage } from '../services/contact.service'

export async function submitContactMessage(req: Request, res: Response) {
  const input = contactMessageSchema.parse(req.body)
  const message = await createContactMessage(input)

  res.status(201).json({
    success: true,
    message: "Message sent — I'll get back to you soon.",
    data: { id: message.id },
  })
}

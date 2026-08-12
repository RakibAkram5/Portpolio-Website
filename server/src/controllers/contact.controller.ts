import type { Request, Response } from 'express'
import { contactMessageSchema } from '../validators/contact.validator'
import { ApiError } from '../utils/ApiError'
import {
  createContactMessage,
  deleteContactMessage,
  getContactMessageById,
  listContactMessages,
} from '../services/contact.service'

export async function submitContactMessage(req: Request, res: Response) {
  const input = contactMessageSchema.parse(req.body)
  const message = await createContactMessage(input)

  res.status(201).json({
    success: true,
    message: "Message sent — I'll get back to you soon.",
    data: { id: message.id },
  })
}

export async function getContactMessages(_req: Request, res: Response) {
  const messages = await listContactMessages()
  res.status(200).json({ success: true, data: messages })
}

export async function removeContactMessage(req: Request<{ id: string }>, res: Response) {
  const existing = await getContactMessageById(req.params.id)
  if (!existing) throw new ApiError(404, 'Message not found.')

  await deleteContactMessage(req.params.id)
  res.status(200).json({ success: true, message: 'Message deleted.' })
}

import { prisma } from '../utils/prisma'
import { sanitizeText } from '../utils/sanitize'
import type { ContactMessageInput } from '../validators/contact.validator'

export async function createContactMessage(input: ContactMessageInput) {
  const message = await prisma.contactMessage.create({
    data: {
      name: sanitizeText(input.name),
      email: input.email.trim().toLowerCase(),
      subject: sanitizeText(input.subject),
      message: sanitizeText(input.message),
    },
  })

  return message
}

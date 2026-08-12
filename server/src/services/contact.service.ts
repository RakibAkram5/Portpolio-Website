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

export async function listContactMessages() {
  return prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function getContactMessageById(id: string) {
  return prisma.contactMessage.findUnique({ where: { id } })
}

export async function deleteContactMessage(id: string) {
  return prisma.contactMessage.delete({ where: { id } })
}

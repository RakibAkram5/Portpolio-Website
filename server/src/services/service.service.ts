import { prisma } from '../utils/prisma'
import type { ServiceInput, ServiceUpdateInput } from '../validators/service.validator'

export async function listServices() {
  return prisma.service.findMany({ orderBy: { order: 'asc' } })
}

export async function getServiceById(id: string) {
  return prisma.service.findUnique({ where: { id } })
}

export async function createService(input: ServiceInput) {
  return prisma.service.create({ data: input })
}

export async function updateService(id: string, input: ServiceUpdateInput) {
  return prisma.service.update({ where: { id }, data: input })
}

export async function deleteService(id: string) {
  return prisma.service.delete({ where: { id } })
}

import { prisma } from '../utils/prisma'

export async function listProjects() {
  return prisma.project.findMany({
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
  })
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({ where: { slug } })
}

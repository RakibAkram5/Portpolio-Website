import { prisma } from '../utils/prisma'
import type { ProjectInput, ProjectUpdateInput } from '../validators/project.validator'

export async function listProjects() {
  return prisma.project.findMany({
    orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
  })
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({ where: { slug } })
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({ where: { id } })
}

export async function createProject(input: ProjectInput) {
  return prisma.project.create({ data: input })
}

export async function updateProject(id: string, input: ProjectUpdateInput) {
  return prisma.project.update({ where: { id }, data: input })
}

export async function deleteProject(id: string) {
  return prisma.project.delete({ where: { id } })
}

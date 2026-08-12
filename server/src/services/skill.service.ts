import { prisma } from '../utils/prisma'
import type { SkillInput, SkillUpdateInput } from '../validators/skill.validator'

export async function listSkills() {
  return prisma.skill.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }] })
}

export async function getSkillById(id: string) {
  return prisma.skill.findUnique({ where: { id } })
}

export async function createSkill(input: SkillInput) {
  return prisma.skill.create({ data: input })
}

export async function updateSkill(id: string, input: SkillUpdateInput) {
  return prisma.skill.update({ where: { id }, data: input })
}

export async function deleteSkill(id: string) {
  return prisma.skill.delete({ where: { id } })
}

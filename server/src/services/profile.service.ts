import { prisma } from '../utils/prisma'
import type { ProfileUpdateInput } from '../validators/profile.validator'

const PROFILE_ID = 1

export async function getProfile() {
  return prisma.profile.findUnique({ where: { id: PROFILE_ID } })
}

export async function upsertProfile(input: ProfileUpdateInput) {
  return prisma.profile.upsert({
    where: { id: PROFILE_ID },
    update: input,
    create: { id: PROFILE_ID, ...(input as Required<ProfileUpdateInput>) },
  })
}

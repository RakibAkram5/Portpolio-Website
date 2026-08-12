import { prisma } from '../utils/prisma'
import type { ProfileUpdateInput } from '../validators/profile.validator'

const PROFILE_ID = 1

export async function getProfile() {
  return prisma.profile.findUnique({ where: { id: PROFILE_ID } })
}

export async function updateProfile(input: ProfileUpdateInput) {
  return prisma.profile.update({
    where: { id: PROFILE_ID },
    data: input,
  })
}

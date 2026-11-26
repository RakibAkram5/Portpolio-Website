import { prisma } from '../utils/prisma'
import type { ProfileUpdateInput } from '../validators/profile.validator'

const PROFILE_ID = 1

// Never ship the raw image bytes with the profile JSON; the photo is served from its own endpoint.
const withoutPhotoBytes = { photoData: true } as const

export async function getProfile() {
  return prisma.profile.findUnique({ where: { id: PROFILE_ID }, omit: withoutPhotoBytes })
}

export async function updateProfile(input: ProfileUpdateInput) {
  return prisma.profile.update({
    where: { id: PROFILE_ID },
    data: input,
    omit: withoutPhotoBytes,
  })
}

export async function getProfilePhoto() {
  return prisma.profile.findUnique({
    where: { id: PROFILE_ID },
    select: { photoData: true, photoMime: true, photoUpdatedAt: true },
  })
}

export async function setProfilePhoto(data: Uint8Array<ArrayBuffer>, mime: string) {
  return prisma.profile.update({
    where: { id: PROFILE_ID },
    data: { photoData: data, photoMime: mime, photoUpdatedAt: new Date() },
    omit: withoutPhotoBytes,
  })
}

export async function clearProfilePhoto() {
  return prisma.profile.update({
    where: { id: PROFILE_ID },
    data: { photoData: null, photoMime: null, photoUpdatedAt: null },
    omit: withoutPhotoBytes,
  })
}

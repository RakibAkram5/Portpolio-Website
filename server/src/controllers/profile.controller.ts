import type { Request, Response } from 'express'
import { profileUpdateSchema } from '../validators/profile.validator'
import { decodePhotoDataUrl, photoUploadSchema } from '../validators/photo.validator'
import { ApiError } from '../utils/ApiError'
import {
  clearProfilePhoto,
  getProfile,
  getProfilePhoto,
  setProfilePhoto,
  updateProfile,
} from '../services/profile.service'

export async function getProfileHandler(_req: Request, res: Response) {
  const profile = await getProfile()
  if (!profile) throw new ApiError(404, 'Profile not found.')
  res.status(200).json({ success: true, data: profile })
}

export async function putProfile(req: Request, res: Response) {
  const input = profileUpdateSchema.parse(req.body)
  const profile = await updateProfile(input)
  res.status(200).json({ success: true, data: profile })
}

export async function getProfilePhotoHandler(req: Request, res: Response) {
  const photo = await getProfilePhoto()
  if (!photo?.photoData || !photo.photoMime) throw new ApiError(404, 'No profile photo uploaded.')

  // The client requests the photo with ?v=<updatedAt>, so each version's URL is immutable.
  const versioned = typeof req.query.v === 'string'
  res.setHeader('Content-Type', photo.photoMime)
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
  res.setHeader(
    'Cache-Control',
    versioned ? 'public, max-age=31536000, immutable' : 'public, max-age=300',
  )
  res.status(200).send(Buffer.from(photo.photoData))
}

export async function putProfilePhoto(req: Request, res: Response) {
  const { dataUrl } = photoUploadSchema.parse(req.body)
  const { bytes, mime } = decodePhotoDataUrl(dataUrl)
  const profile = await setProfilePhoto(new Uint8Array(bytes), mime)
  res.status(200).json({ success: true, data: profile, message: 'Photo updated.' })
}

export async function deleteProfilePhoto(_req: Request, res: Response) {
  const profile = await clearProfilePhoto()
  res.status(200).json({ success: true, data: profile, message: 'Photo removed.' })
}

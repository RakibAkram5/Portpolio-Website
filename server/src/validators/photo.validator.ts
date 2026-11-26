import { z } from 'zod'
import { ApiError } from '../utils/ApiError'

export const MAX_PHOTO_BYTES = 2 * 1024 * 1024

export const photoUploadSchema = z.object({
  dataUrl: z.string().startsWith('data:image/').max(3_000_000, 'Image is too large (max 2 MB).'),
})

const SIGNATURES: Record<string, (b: Buffer) => boolean> = {
  'image/jpeg': (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  'image/png': (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
  'image/webp': (b) => b.subarray(0, 4).toString('ascii') === 'RIFF' && b.subarray(8, 12).toString('ascii') === 'WEBP',
}

/** Decodes a base64 data URL and verifies the bytes really are a JPEG/PNG/WebP image. */
export function decodePhotoDataUrl(dataUrl: string): { bytes: Buffer; mime: string } {
  const match = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl)
  if (!match) throw new ApiError(422, 'Photo must be a JPEG, PNG or WebP image.')

  const mime = match[1]
  const bytes = Buffer.from(match[2], 'base64')

  if (bytes.length === 0) throw new ApiError(422, 'Photo is empty.')
  if (bytes.length > MAX_PHOTO_BYTES) throw new ApiError(413, 'Image is too large (max 2 MB).')
  if (!SIGNATURES[mime](bytes)) throw new ApiError(422, 'File contents do not match the image type.')

  return { bytes, mime }
}

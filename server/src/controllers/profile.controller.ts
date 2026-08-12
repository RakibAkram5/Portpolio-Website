import type { Request, Response } from 'express'
import { profileUpdateSchema } from '../validators/profile.validator'
import { getProfile, upsertProfile } from '../services/profile.service'

export async function getProfileHandler(_req: Request, res: Response) {
  const profile = await getProfile()
  res.status(200).json({ success: true, data: profile })
}

export async function putProfile(req: Request, res: Response) {
  const input = profileUpdateSchema.parse(req.body)
  const profile = await upsertProfile(input)
  res.status(200).json({ success: true, data: profile })
}

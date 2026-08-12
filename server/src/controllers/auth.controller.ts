import type { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { loginSchema } from '../validators/auth.validator'
import { signAdminToken } from '../utils/jwt'
import { ApiError } from '../utils/ApiError'
import { env } from '../utils/env'

export async function login(req: Request, res: Response) {
  const { password } = loginSchema.parse(req.body)

  const valid = await bcrypt.compare(password, env.adminPasswordHash)
  if (!valid) {
    throw new ApiError(401, 'Incorrect password.')
  }

  const token = signAdminToken()
  res.status(200).json({ success: true, data: { token } })
}

export function me(_req: Request, res: Response) {
  res.status(200).json({ success: true, data: { authenticated: true } })
}

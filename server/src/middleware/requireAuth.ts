import type { NextFunction, Request, Response } from 'express'
import { verifyAdminToken } from '../utils/jwt'

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined

  if (!token || !verifyAdminToken(token)) {
    res.status(401).json({ success: false, message: 'Authentication required.' })
    return
  }

  next()
}

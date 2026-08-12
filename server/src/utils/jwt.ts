import jwt from 'jsonwebtoken'
import { env } from './env'

const ADMIN_TOKEN_SUBJECT = 'admin'
const TOKEN_TTL = '12h'

export function signAdminToken(): string {
  return jwt.sign({ sub: ADMIN_TOKEN_SUBJECT }, env.jwtSecret, { expiresIn: TOKEN_TTL })
}

export function verifyAdminToken(token: string): boolean {
  try {
    const payload = jwt.verify(token, env.jwtSecret)
    return typeof payload === 'object' && payload.sub === ADMIN_TOKEN_SUBJECT
  } catch {
    return false
  }
}

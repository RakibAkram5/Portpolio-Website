import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'
import { ApiError } from '../utils/ApiError'
import { isProduction } from '../utils/env'

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` })
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    const errors: Record<string, string> = {}
    for (const issue of err.issues) {
      const key = issue.path.join('.') || 'form'
      errors[key] = issue.message
    }
    res.status(422).json({ success: false, message: 'Validation failed.', errors })
    return
  }

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ success: false, message: err.message, errors: err.errors })
    return
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const target = Array.isArray(err.meta?.target) ? err.meta.target.join(', ') : 'field'
      res.status(409).json({ success: false, message: `A record with that ${target} already exists.` })
      return
    }
    if (err.code === 'P2025') {
      res.status(404).json({ success: false, message: 'Record not found.' })
      return
    }
  }

  console.error(err)
  res.status(500).json({
    success: false,
    message: isProduction ? 'Something went wrong. Please try again later.' : String(err),
  })
}

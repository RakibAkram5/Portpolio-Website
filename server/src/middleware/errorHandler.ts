import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
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

  console.error(err)
  res.status(500).json({
    success: false,
    message: isProduction ? 'Something went wrong. Please try again later.' : String(err),
  })
}

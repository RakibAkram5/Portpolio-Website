import type { Request, Response } from 'express'
import { z } from 'zod'
import { getVisitStats, isBot, recordVisit } from '../services/visit.service'

function clientIp(req: Request) {
  // Netlify puts the real client address here; elsewhere fall back to Express' proxy-aware req.ip.
  const nf = req.headers['x-nf-client-connection-ip']
  return (Array.isArray(nf) ? nf[0] : nf) || req.ip || 'unknown'
}

export async function postVisit(req: Request, res: Response) {
  const ua = req.headers['user-agent']
  if (!isBot(ua)) {
    await recordVisit(clientIp(req), ua as string)
  }
  res.status(204).end()
}

const statsQuery = z.object({ days: z.coerce.number().int().min(7).max(365).default(30) })

export async function getVisitStatsHandler(req: Request, res: Response) {
  const { days } = statsQuery.parse(req.query)
  const stats = await getVisitStats(days)
  res.status(200).json({ success: true, data: stats })
}

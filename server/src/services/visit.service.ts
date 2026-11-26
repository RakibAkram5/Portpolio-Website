import { createHash } from 'node:crypto'
import { prisma } from '../utils/prisma'
import { env } from '../utils/env'

/** Days roll over at midnight in the site owner's timezone. */
export const VISIT_TIMEZONE = 'Asia/Karachi'

const BOT_PATTERN =
  /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|embedly|curl|wget|python|node-fetch|axios|go-http|java\//i

/** "YYYY-MM-DD" for the given instant in VISIT_TIMEZONE. */
export function localDay(date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: VISIT_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

function dayToDate(day: string) {
  return new Date(`${day}T00:00:00.000Z`)
}

export function isBot(userAgent: string | undefined) {
  return !userAgent || BOT_PATTERN.test(userAgent)
}

/**
 * Anonymous per-day visitor id. The day is part of the salt, so the same person can't be
 * linked across days, and the server secret keeps the hash from being reversed to an IP.
 */
function visitorHash(day: string, ip: string, userAgent: string) {
  return createHash('sha256').update(`${day}|${ip}|${userAgent}|${env.jwtSecret}`).digest('hex').slice(0, 32)
}

export async function recordVisit(ip: string, userAgent: string) {
  const day = localDay()
  const key = { day: dayToDate(day), visitorHash: visitorHash(day, ip, userAgent) }
  await prisma.visitorDay.upsert({
    where: { day_visitorHash: key },
    create: key,
    update: { views: { increment: 1 }, lastSeenAt: new Date() },
  })
}

export interface DailyVisits {
  date: string
  visitors: number
  views: number
}

export async function getVisitStats(days: number) {
  const today = localDay()
  const end = dayToDate(today)
  const start = new Date(end.getTime() - (days - 1) * 86_400_000)

  const [grouped, allTime] = await Promise.all([
    prisma.visitorDay.groupBy({
      by: ['day'],
      where: { day: { gte: start, lte: end } },
      _count: { _all: true },
      _sum: { views: true },
    }),
    prisma.visitorDay.aggregate({ _count: { _all: true }, _sum: { views: true } }),
  ])

  const byDay = new Map(grouped.map((g) => [g.day.toISOString().slice(0, 10), g]))

  // Every day in the range, including days with zero visits.
  const daily: DailyVisits[] = []
  for (let t = start.getTime(); t <= end.getTime(); t += 86_400_000) {
    const date = new Date(t).toISOString().slice(0, 10)
    const g = byDay.get(date)
    daily.push({ date, visitors: g?._count._all ?? 0, views: g?._sum.views ?? 0 })
  }

  const sumLast = (n: number) =>
    daily.slice(-n).reduce((acc, d) => ({ visitors: acc.visitors + d.visitors, views: acc.views + d.views }), {
      visitors: 0,
      views: 0,
    })

  return {
    timezone: VISIT_TIMEZONE,
    today: daily[daily.length - 1],
    last7: sumLast(Math.min(7, days)),
    range: sumLast(days),
    allTime: { visitors: allTime._count._all, views: allTime._sum.views ?? 0 },
    daily,
  }
}

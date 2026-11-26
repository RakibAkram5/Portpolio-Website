import { useEffect, useMemo, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { useAuth } from '@/hooks/useAuth'
import { fetchVisitStats } from '@/services/adminApi'
import { cn } from '@/utils/cn'
import type { DailyVisits, VisitStats } from '@/types'

const RANGES = [7, 30, 90] as const

const dayLabel = (date: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', { timeZone: 'UTC', ...opts })

/** Round the axis max up to a readable number (1, 2, 5 × 10ⁿ). */
function niceMax(value: number) {
  if (value <= 4) return 4
  const pow = 10 ** Math.floor(Math.log10(value))
  const step = [1, 2, 5, 10].find((m) => m * pow >= value) ?? 10
  return step * pow
}

function StatTile({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/70 px-5 py-4">
      <div className="text-xs font-medium text-text-secondary">{label}</div>
      <div className="mt-1.5 font-mono text-3xl font-bold tabular-nums text-text-primary">{value.toLocaleString()}</div>
      {sub && <div className="mt-1 text-xs text-text-muted">{sub}</div>}
    </div>
  )
}

function VisitsChart({ daily }: { daily: DailyVisits[] }) {
  const [hover, setHover] = useState<number | null>(null)
  const max = niceMax(Math.max(...daily.map((d) => d.visitors)))
  const ticks = [max, max / 2, 0]
  // About six x-axis labels whatever the range.
  const labelEvery = Math.max(1, Math.ceil(daily.length / 6))
  const h = hover !== null ? daily[hover] : null

  return (
    <div className="relative">
      <div className="flex gap-3">
        {/* Y axis */}
        <div className="flex h-56 flex-col justify-between py-0 text-right font-mono text-[11px] tabular-nums text-text-muted">
          {ticks.map((t) => (
            <span key={t} className="-translate-y-1/2 first:translate-y-0 last:translate-y-0">
              {Number.isInteger(t) ? t : t.toFixed(1)}
            </span>
          ))}
        </div>

        <div className="relative flex-1">
          {/* Recessive gridlines */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-56">
            {ticks.map((t, i) => (
              <div key={t} className="absolute inset-x-0 border-t border-border" style={{ top: `${(i / (ticks.length - 1)) * 100}%` }} />
            ))}
          </div>

          {/* Bars — the whole column is the hit target, larger than the mark */}
          <div className="relative flex h-56 items-end gap-[2px]" onMouseLeave={() => setHover(null)}>
            {daily.map((d, i) => (
              <button
                key={d.date}
                type="button"
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                aria-label={`${dayLabel(d.date, { day: 'numeric', month: 'short' })}: ${d.visitors} visitors, ${d.views} page views`}
                className="group flex h-full min-w-0 flex-1 cursor-default items-end outline-none"
              >
                <span
                  className={cn(
                    'block w-full rounded-t-[4px] transition-colors',
                    hover === i ? 'bg-accent-soft' : 'bg-accent/80',
                    d.visitors === 0 && 'bg-border-strong',
                  )}
                  style={{ height: d.visitors === 0 ? '2px' : `${(d.visitors / max) * 100}%` }}
                />
              </button>
            ))}
          </div>

          {/* X axis */}
          <div className="mt-2 flex gap-[2px] font-mono text-[10px] text-text-muted">
            {daily.map((d, i) => (
              <span key={d.date} className="min-w-0 flex-1 overflow-visible whitespace-nowrap text-center">
                {(daily.length - 1 - i) % labelEvery === 0 ? dayLabel(d.date, { day: 'numeric', month: 'short' }) : ''}
              </span>
            ))}
          </div>

          {/* Tooltip */}
          {h && hover !== null && (
            <div
              className="pointer-events-none absolute -top-2 z-10 w-40 -translate-x-1/2 -translate-y-full rounded-xl border border-border-strong bg-surface-2 px-3 py-2 text-xs shadow-xl"
              style={{ left: `clamp(80px, ${((hover + 0.5) / daily.length) * 100}%, calc(100% - 80px))` }}
            >
              <div className="font-medium text-text-primary">{dayLabel(h.date, { weekday: 'short', day: 'numeric', month: 'short' })}</div>
              <div className="mt-1 flex justify-between text-text-secondary">
                Visitors <span className="font-mono text-text-primary">{h.visitors}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                Page views <span className="font-mono text-text-primary">{h.views}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function AnalyticsAdmin() {
  const { token } = useAuth()
  const [days, setDays] = useState<(typeof RANGES)[number]>(30)
  const [stats, setStats] = useState<VisitStats | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!token) return
    let cancelled = false
    setLoading(true)
    fetchVisitStats(token, days).then((res) => {
      if (cancelled) return
      if (res.success && res.data) {
        setStats(res.data)
        setError('')
      } else {
        setError(res.message ?? 'Failed to load visitor stats.')
      }
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [token, days, reloadKey])

  const tableRows = useMemo(() => (stats ? [...stats.daily].reverse() : []), [stats])
  const hasData = stats ? stats.daily.some((d) => d.visitors > 0) : false

  return (
    <div>
      <AdminPageHeader title="Analytics" description="How many people visit your site each day." />

      <div className="px-6 py-6 sm:px-8">
        {/* Filters in one row above the chart */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl border border-border-strong bg-surface-2 p-1">
            {RANGES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setDays(r)}
                className={cn(
                  'cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                  days === r ? 'bg-accent/15 text-accent' : 'text-text-secondary hover:text-text-primary',
                )}
              >
                {r} days
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-border-strong px-3 py-2 text-xs text-text-secondary hover:text-accent"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {error && <p className="mt-6 text-sm text-rose">{error}</p>}

        {stats && (
          <>
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatTile label="Today" value={stats.today.visitors} sub={`${stats.today.views} page views`} />
              <StatTile label="Last 7 days" value={stats.last7.visitors} sub={`${stats.last7.views} page views`} />
              <StatTile label={`Last ${days} days`} value={stats.range.visitors} sub={`${stats.range.views} page views`} />
              <StatTile label="All time" value={stats.allTime.visitors} sub={`${stats.allTime.views} page views`} />
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-surface/70 p-5 pt-10 sm:p-6 sm:pt-10">
              <div className="-mt-5 mb-6 flex items-baseline justify-between gap-3">
                <h2 className="text-sm font-semibold text-text-primary">Visitors per day</h2>
                <span className="text-[11px] text-text-muted">Days in {stats.timezone.replace('_', ' ')} time</span>
              </div>
              {hasData ? (
                <VisitsChart daily={stats.daily} />
              ) : (
                <p className="py-16 text-center text-sm text-text-secondary">
                  No visits recorded in this period yet. Counting starts from the moment this feature went live.
                </p>
              )}
            </div>

            {/* Table view of the same data */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-surface-2 text-left text-xs text-text-secondary">
                  <tr>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 text-right font-medium">Visitors</th>
                    <th className="px-4 py-3 text-right font-medium">Page views</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((d, i) => (
                    <tr key={d.date} className="border-t border-border">
                      <td className="px-4 py-2.5 text-text-primary">
                        {dayLabel(d.date, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                        {i === 0 && <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">Today</span>}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono tabular-nums text-text-primary">{d.visitors}</td>
                      <td className="px-4 py-2.5 text-right font-mono tabular-nums text-text-secondary">{d.views}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-text-muted">
              A visitor is counted once per day per device; page views count every load. Bots and your own visits while logged in are not counted. No cookies are used and IP addresses are never stored.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

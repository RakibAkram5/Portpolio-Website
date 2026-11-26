import { useEffect, useState } from 'react'
import type { ApiResponse } from '@/types'

type Status = 'loading' | 'live' | 'fallback'

interface CacheEntry {
  promise: Promise<ApiResponse<unknown>>
  result?: ApiResponse<unknown>
}

// One in-flight/settled request per fetcher, shared by every component that uses it
// (the profile alone is read by ~8 components on the home page).
const cache = new Map<() => Promise<ApiResponse<unknown>>, CacheEntry>()

function load<T>(fetcher: () => Promise<ApiResponse<T>>): CacheEntry {
  let entry = cache.get(fetcher)
  if (!entry) {
    const created: CacheEntry = { promise: fetcher() }
    created.promise.then((res) => {
      created.result = res
      // Don't keep failures around: the next mount gets a fresh attempt.
      if (!res.success) cache.delete(fetcher)
    })
    cache.set(fetcher, created)
    entry = created
  }
  return entry
}

function resolve<T>(res: ApiResponse<unknown> | undefined, fallback: T): { data: T; status: Status } {
  if (!res) return { data: fallback, status: 'loading' }
  if (res.success && res.data !== undefined) return { data: res.data as T, status: 'live' }
  return { data: fallback, status: 'fallback' }
}

/** Drops a cached response so the next read refetches (used after admin edits). */
export function invalidateApiData(fetcher: () => Promise<ApiResponse<unknown>>) {
  cache.delete(fetcher)
}

export function useApiData<T>(fetcher: () => Promise<ApiResponse<T>>, fallback: T) {
  const [state, setState] = useState(() => resolve(cache.get(fetcher)?.result, fallback))

  useEffect(() => {
    let cancelled = false
    const entry = load(fetcher)
    entry.promise.then((res) => {
      if (!cancelled) setState(resolve(res, fallback))
    })
    return () => {
      cancelled = true
    }
    // fetcher and fallback are module-level constants at every call site.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher])

  return state
}

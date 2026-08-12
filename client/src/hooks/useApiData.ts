import { useEffect, useState } from 'react'
import type { ApiResponse } from '@/types'

type Status = 'loading' | 'live' | 'fallback'

export function useApiData<T>(fetcher: () => Promise<ApiResponse<T>>, fallback: T) {
  const [data, setData] = useState<T>(fallback)
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    let cancelled = false

    fetcher().then((res) => {
      if (cancelled) return
      if (res.success && res.data !== undefined) {
        setData(res.data)
        setStatus('live')
      } else {
        setStatus('fallback')
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  return { data, status }
}

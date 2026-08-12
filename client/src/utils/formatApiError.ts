import type { ApiResponse } from '@/types'

export function formatApiError(res: ApiResponse<unknown>): string {
  const base = res.message ?? 'Something went wrong.'

  if (!res.errors || Object.keys(res.errors).length === 0) {
    return base
  }

  const details = Object.entries(res.errors)
    .map(([field, reason]) => `${field}: ${reason}`)
    .join(' · ')

  return `${base} (${details})`
}

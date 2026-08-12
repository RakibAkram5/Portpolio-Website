import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import type { ApiResponse } from '@/types'

interface CrudApi<TRecord, TInput> {
  create: (token: string, input: TInput) => Promise<ApiResponse<TRecord>>
  update: (token: string, id: string, input: Partial<TInput>) => Promise<ApiResponse<TRecord>>
  remove: (token: string, id: string) => Promise<ApiResponse<{ id: string }>>
}

export function useAdminCrud<TRecord extends { id: string }, TInput>(
  fetchList: () => Promise<ApiResponse<TRecord[]>>,
  api: CrudApi<TRecord, TInput>,
) {
  const { token } = useAuth()
  const [items, setItems] = useState<TRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const reload = useCallback(async () => {
    setLoading(true)
    const res = await fetchList()
    if (res.success && res.data) {
      setItems(res.data)
      setError('')
    } else {
      setError(res.message ?? 'Failed to load data.')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  async function create(input: TInput) {
    if (!token) return { success: false, message: 'Not authenticated.' }
    const res = await api.create(token, input)
    if (res.success) await reload()
    return res
  }

  async function update(id: string, input: Partial<TInput>) {
    if (!token) return { success: false, message: 'Not authenticated.' }
    const res = await api.update(token, id, input)
    if (res.success) await reload()
    return res
  }

  async function remove(id: string) {
    if (!token) return { success: false, message: 'Not authenticated.' }
    const res = await api.remove(token, id)
    if (res.success) await reload()
    return res
  }

  return { items, loading, error, create, update, remove, reload }
}

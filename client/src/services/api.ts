import { siteConfig } from '@/config/site'
import type { ApiResponse, ContactFormData } from '@/types'

async function request<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${siteConfig.apiBaseUrl}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })

    const json = (await res.json()) as ApiResponse<T>

    if (!res.ok) {
      return { success: false, message: json.message ?? 'Something went wrong.', errors: json.errors }
    }

    return json
  } catch {
    return { success: false, message: 'Unable to reach the server. Please try again later.' }
  }
}

export function sendContactMessage(data: ContactFormData) {
  return request<{ id: string }>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function fetchProjects() {
  return request('/projects')
}

import { apiBaseUrl } from '@/config/site'
import type { ApiResponse, ContactFormData, Profile, Project, Service, Skill, TimelineItem } from '@/types'

export const AUTH_EXPIRED_EVENT = 'portfolio:auth-expired'

export async function request<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options?.headers },
    })

    const json = (await res.json().catch(() => ({}))) as ApiResponse<T>

    if (res.status === 401 && new Headers(options?.headers).has('Authorization')) {
      // Admin token expired or was revoked: let the auth provider sign out.
      window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT))
    }

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
  return request<Project[]>('/projects')
}

export function fetchSkills() {
  return request<Skill[]>('/skills')
}

export function fetchServices() {
  return request<Service[]>('/services')
}

export function fetchTimeline() {
  return request<TimelineItem[]>('/timeline')
}

export function fetchProfile() {
  return request<Profile>('/profile')
}

/** Public URL of the uploaded profile photo, or null if none. Versioned so browsers cache each upload forever. */
export function profilePhotoUrl(profile: Pick<Profile, 'photoUpdatedAt'>): string | null {
  if (!profile.photoUpdatedAt) return null
  return `${apiBaseUrl}/profile/photo?v=${new Date(profile.photoUpdatedAt).getTime()}`
}

let visitRecorded = false

/** Counts one page view for the daily visitor stats. Skipped for the logged-in site owner. */
export function recordVisit() {
  if (visitRecorded) return
  visitRecorded = true
  try {
    if (localStorage.getItem('portfolio_admin_token')) return
  } catch {
    // Storage unavailable (private mode) — still count the visit.
  }
  fetch(`${apiBaseUrl}/visits`, { method: 'POST', keepalive: true }).catch(() => {})
}

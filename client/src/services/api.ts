import { apiBaseUrl } from '@/config/site'
import type { ApiResponse, ContactFormData, Profile, Project, Service, Skill, TimelineItem } from '@/types'

export async function request<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options?.headers },
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

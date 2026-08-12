import { request } from './api'
import type {
  Profile,
  Project,
  ProjectInput,
  Service,
  ServiceInput,
  Skill,
  SkillInput,
  TimelineItem,
  TimelineItemInput,
} from '@/types'

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` }
}

function createCrud<TRecord, TInput>(resource: string) {
  return {
    create: (token: string, input: TInput) =>
      request<TRecord>(`/${resource}`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(input),
      }),
    update: (token: string, id: string, input: Partial<TInput>) =>
      request<TRecord>(`/${resource}/${id}`, {
        method: 'PUT',
        headers: authHeaders(token),
        body: JSON.stringify(input),
      }),
    remove: (token: string, id: string) =>
      request<{ id: string }>(`/${resource}/${id}`, {
        method: 'DELETE',
        headers: authHeaders(token),
      }),
  }
}

export const projectAdminApi = createCrud<Project, ProjectInput>('projects')
export const skillAdminApi = createCrud<Skill, SkillInput>('skills')
export const serviceAdminApi = createCrud<Service, ServiceInput>('services')
export const timelineAdminApi = createCrud<TimelineItem, TimelineItemInput>('timeline')

export function updateProfile(token: string, input: Partial<Profile>) {
  return request<Profile>('/profile', {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(input),
  })
}

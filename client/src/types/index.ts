export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Mobile' | 'Tools'

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  description: string
  level: SkillLevel
  icon: string
  order: number
}

export type SkillInput = Omit<Skill, 'id'>

export interface Project {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  problem: string
  architecture: string
  tech: string[]
  features: string[]
  image: string
  screenshots: string[]
  githubUrl: string
  liveUrl: string | null
  featured: boolean
  order: number
}

export type ProjectInput = Omit<Project, 'id'>

export type TimelineTrack = 'JOURNEY' | 'CAREER'

export interface TimelineItem {
  id: string
  track: TimelineTrack
  year: string
  title: string
  description: string
  order: number
}

export type TimelineItemInput = Omit<TimelineItem, 'id'>

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  order: number
}

export type ServiceInput = Omit<Service, 'id'>

export interface ProfileStat {
  value: string
  label: string
}

export interface Profile {
  name: string
  role: string
  roles: string[]
  tagline: string
  intro: string
  email: string
  location: string
  resumeUrl: string
  githubUsername: string
  githubUrl: string
  linkedinUrl: string
  aboutHeading: string
  aboutParagraphs: string[]
  stats: ProfileStat[]
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string>
}

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}

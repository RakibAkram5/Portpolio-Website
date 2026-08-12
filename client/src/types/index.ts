export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Mobile' | 'Tools'

export interface Skill {
  name: string
  category: SkillCategory
  description: string
  level: SkillLevel
  icon: string
}

export interface ProjectFeature {
  title: string
  description?: string
}

export interface Project {
  id: string
  slug: string
  name: string
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
}

export interface TimelineItem {
  year: string
  title: string
  description: string
}

export interface Service {
  title: string
  description: string
  icon: string
}

export interface ExperienceItem {
  year: string
  title: string
  description: string
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

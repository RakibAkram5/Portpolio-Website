import type { NavLink, Profile, SocialLink } from '@/types'

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api'

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export function buildSocialLinks(profile: Profile): SocialLink[] {
  return [
    { label: 'GitHub', href: profile.githubUrl, icon: 'github' },
    { label: 'LinkedIn', href: profile.linkedinUrl, icon: 'linkedin' },
    { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
  ]
}

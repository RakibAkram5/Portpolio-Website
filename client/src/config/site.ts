import type { NavLink, SocialLink } from '@/types'

/**
 * Central place for identity/contact placeholders.
 * Replace these with real values before deploying.
 */
export const siteConfig = {
  name: 'Rakib Akram',
  role: 'Full-Stack Developer',
  roles: ['Full-Stack Developer', 'Flutter Developer', 'Backend Developer'],
  tagline: 'Building Digital Products That Actually Work.',
  intro:
    "I build scalable, production-ready web and mobile applications with modern frontend, backend, and database technologies.",
  email: 'hello@rakibakram.dev',
  location: 'Bangladesh',
  resumeUrl: '/resume.pdf',
  githubUsername: 'rakibakram',
  githubUrl: 'https://github.com/rakibakram',
  linkedinUrl: 'https://linkedin.com/in/rakibakram',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api',
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: siteConfig.githubUrl, icon: 'github' },
  { label: 'LinkedIn', href: siteConfig.linkedinUrl, icon: 'linkedin' },
  { label: 'Email', href: `mailto:${siteConfig.email}`, icon: 'mail' },
]

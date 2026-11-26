import type { Profile } from '@/types'

// Shown only until the API responds (or if it's unreachable), so it mirrors the live profile.
export const profile: Profile = {
  name: 'Muhammad Rakib Akram',
  role: 'Full-Stack Developer',
  roles: ['Full-Stack Developer', 'Flutter Developer', 'Backend Developer'],
  tagline: 'Building Digital Products That Actually Work.',
  intro:
    "I'm Muhammad Rakib Akram, a Full-Stack Developer specializing in modern web applications, Flutter apps, scalable backend systems, APIs, and database architecture.",
  email: 'muhammadrakibakram@gmail.com',
  phone: '+923014334151',
  location: 'Lahore, Pakistan',
  resumeUrl: 'https://drive.google.com/file/d/1LJamCOGN06Yu1jMvihkrffRcjA6h9ct8/view?usp=drive_link',
  githubUsername: 'rakibakram5',
  githubUrl: 'https://github.com/RakibAkram5',
  linkedinUrl: 'https://www.linkedin.com/in/muhammad-rakib-akram-52146a240/',
  aboutHeading: 'Behind the Code',
  aboutParagraphs: [
    "I'm a developer who enjoys turning ideas into real, working software. What started as curiosity about how applications are built has grown into a focused path through full-stack web development, Flutter mobile apps, and backend architecture.",
    "I care about the details that don't show up in a demo — clean data models, predictable APIs, sensible error handling, and code that's still easy to work with months later. My approach blends practical product thinking with an interest in how systems are structured underneath.",
  ],
  stats: [
    { value: '3+', label: 'Years Learning & Building' },
    { value: '10+', label: 'Projects' },
    { value: 'Multiple', label: 'Technologies' },
    { value: 'Full-Stack', label: 'Development' },
  ],
  photoUpdatedAt: null,
}

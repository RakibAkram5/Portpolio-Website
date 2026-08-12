import type { TimelineItem } from '@/types'

const rawJourney: Omit<TimelineItem, 'id' | 'order' | 'track'>[] = [
  { year: 'Learning', title: 'Learning', description: 'Studying computer science fundamentals, programming languages, and core CS concepts.' },
  { year: 'Building', title: 'Building', description: 'Applying fundamentals to real applications — mobile apps, APIs, and databases.' },
  { year: 'Freelancing', title: 'Freelancing', description: 'Delivering client projects end-to-end, from requirements to deployment.' },
  { year: 'Full-Stack', title: 'Full-Stack Development', description: 'Designing scalable architectures across frontend, backend, and database layers.' },
]

const rawCareer: Omit<TimelineItem, 'id' | 'order' | 'track'>[] = [
  {
    year: '2023',
    title: 'Started Computer Science Journey',
    description:
      'Began formal computer science education, building a foundation in programming logic, data structures, and problem-solving.',
  },
  {
    year: '2024',
    title: 'Programming Fundamentals & Application Development',
    description:
      'Focused on core programming fundamentals while building small applications to reinforce concepts in practice.',
  },
  {
    year: '2025',
    title: 'Flutter, Backend & Database Projects',
    description:
      'Started building larger, real-world projects — Flutter mobile apps, backend services, Firebase integrations, and database-driven systems.',
  },
  {
    year: '2026',
    title: 'Full-Stack Development & Production Systems',
    description:
      'Focused on full-stack development, scalable software architecture, and shipping production-ready applications.',
  },
]

export const timelineItems: TimelineItem[] = [
  ...rawJourney.map((item, i) => ({ ...item, id: `journey-${i}`, order: i, track: 'JOURNEY' as const })),
  ...rawCareer.map((item, i) => ({ ...item, id: `career-${i}`, order: i, track: 'CAREER' as const })),
]

export const journeyTimeline = timelineItems.filter((item) => item.track === 'JOURNEY')
export const experienceTimeline = timelineItems.filter((item) => item.track === 'CAREER')

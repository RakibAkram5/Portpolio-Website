import type { Skill } from '@/types'

export const skills: Skill[] = [
  // Frontend
  {
    name: 'React',
    category: 'Frontend',
    description: 'Building responsive and scalable web interfaces.',
    level: 'Advanced',
    icon: 'react',
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    description: 'Writing type-safe, maintainable application code.',
    level: 'Advanced',
    icon: 'typescript',
  },
  {
    name: 'JavaScript',
    category: 'Frontend',
    description: 'Core language for interactive, dynamic UIs.',
    level: 'Advanced',
    icon: 'javascript',
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    description: 'Rapidly building consistent, responsive UI systems.',
    level: 'Advanced',
    icon: 'tailwind',
  },
  {
    name: 'HTML5 & CSS3',
    category: 'Frontend',
    description: 'Semantic markup and modern styling fundamentals.',
    level: 'Advanced',
    icon: 'html5',
  },

  // Backend
  {
    name: 'Node.js',
    category: 'Backend',
    description: 'Building REST APIs and backend services.',
    level: 'Advanced',
    icon: 'nodejs',
  },
  {
    name: 'Express.js',
    category: 'Backend',
    description: 'Designing structured, middleware-driven server apps.',
    level: 'Advanced',
    icon: 'express',
  },
  {
    name: 'REST APIs',
    category: 'Backend',
    description: 'Architecting clean, versioned, well-documented APIs.',
    level: 'Advanced',
    icon: 'api',
  },
  {
    name: 'Authentication & Authorization',
    category: 'Backend',
    description: 'Implementing secure session, token, and role-based access.',
    level: 'Intermediate',
    icon: 'shield',
  },
  {
    name: 'Firebase',
    category: 'Backend',
    description: 'Auth, cloud functions, and realtime backend services.',
    level: 'Intermediate',
    icon: 'firebase',
  },

  // Database
  {
    name: 'PostgreSQL',
    category: 'Database',
    description: 'Designing relational databases and scalable data structures.',
    level: 'Advanced',
    icon: 'postgresql',
  },
  {
    name: 'Prisma ORM',
    category: 'Database',
    description: 'Type-safe database access and migrations.',
    level: 'Advanced',
    icon: 'prisma',
  },
  {
    name: 'SQLite',
    category: 'Database',
    description: 'Lightweight, offline-first embedded storage.',
    level: 'Intermediate',
    icon: 'sqlite',
  },
  {
    name: 'Firebase Firestore',
    category: 'Database',
    description: 'NoSQL document storage with realtime sync.',
    level: 'Intermediate',
    icon: 'firestore',
  },

  // Mobile
  {
    name: 'Flutter',
    category: 'Mobile',
    description: 'Building cross-platform mobile applications.',
    level: 'Advanced',
    icon: 'flutter',
  },
  {
    name: 'Dart',
    category: 'Mobile',
    description: 'Core language powering Flutter applications.',
    level: 'Advanced',
    icon: 'dart',
  },

  // Tools
  {
    name: 'Git & GitHub',
    category: 'Tools',
    description: 'Version control and collaborative workflows.',
    level: 'Advanced',
    icon: 'github',
  },
  {
    name: 'Docker',
    category: 'Tools',
    description: 'Containerizing apps for consistent environments.',
    level: 'Intermediate',
    icon: 'docker',
  },
  {
    name: 'Postman',
    category: 'Tools',
    description: 'API testing, documentation, and debugging.',
    level: 'Advanced',
    icon: 'postman',
  },
  {
    name: 'VS Code',
    category: 'Tools',
    description: 'Primary editor, tuned for a fast dev workflow.',
    level: 'Advanced',
    icon: 'vscode',
  },
  {
    name: 'Android Studio',
    category: 'Tools',
    description: 'Building, debugging, and profiling mobile apps.',
    level: 'Intermediate',
    icon: 'androidstudio',
  },
]

export const skillCategories = ['Frontend', 'Backend', 'Database', 'Mobile', 'Tools'] as const

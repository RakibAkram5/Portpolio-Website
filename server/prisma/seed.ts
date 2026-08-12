import { PrismaClient, type SkillCategory, type SkillLevel, type TimelineTrack } from '@prisma/client'

const prisma = new PrismaClient()

const projects = [
  {
    title: 'TaleemPlus',
    slug: 'taleemplus',
    tagline: 'Educational management and learning platform',
    description:
      'A full-featured educational management platform connecting students, teachers, and parents in one place — covering the entire academic workflow from enrollment to results.',
    problem:
      'Schools and tutoring centers relied on scattered spreadsheets, paper records, and manual grading. TaleemPlus centralizes academic operations with role-based portals, automated test generation, and offline-first quizzes so classes keep running even with unreliable connectivity.',
    architecture:
      'Flutter client with an offline-first data layer backed by SQLite, syncing to Firebase (Auth, Firestore, Cloud Storage) when online. An OCR pipeline scans printed documents into structured question banks, and an AI service generates test papers from the scanned content.',
    image: '/projects/taleemplus/cover.png',
    screenshots: ['/projects/taleemplus/screen-1.png', '/projects/taleemplus/screen-2.png', '/projects/taleemplus/screen-3.png'],
    githubUrl: 'https://github.com/rakibakram/taleemplus',
    liveUrl: null,
    tech: ['Flutter', 'Firebase', 'SQLite', 'AI/OCR'],
    features: [
      'Authentication with role-based access (student, teacher, parent, admin)',
      'Student portal with assignments, results, and progress tracking',
      'Teacher dashboard for class, attendance, and grade management',
      'Parent portal for monitoring child performance',
      'OCR document scanner for digitizing printed materials',
      'AI-assisted test generation from scanned content',
      'Offline-first quiz system that syncs when reconnected',
      'Automated result management and report cards',
    ],
    featured: true,
    order: 0,
  },
  {
    title: 'SRS Godown ERP',
    slug: 'srs-godown-erp',
    tagline: 'Warehouse and inventory management system',
    description:
      'An ERP system for warehouse and distribution operations — tracking stock, dealers, vendors, and finances in real time with a type-safe full-stack architecture.',
    problem:
      'Manual stock registers led to mismatched inventory counts, delayed invoicing, and no visibility into outstanding dealer/vendor balances. SRS Godown ERP replaces that with a single system of record for purchases, sales, and stock movement.',
    architecture:
      'React + TypeScript SPA talking to an Express REST API, with Prisma as the type-safe data layer over PostgreSQL. QR-based product lookups speed up floor operations, and generated PDFs handle invoicing.',
    image: '/projects/srs-godown-erp/cover.png',
    screenshots: ['/projects/srs-godown-erp/screen-1.png', '/projects/srs-godown-erp/screen-2.png', '/projects/srs-godown-erp/screen-3.png'],
    githubUrl: 'https://github.com/rakibakram/srs-godown-erp',
    liveUrl: null,
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL'],
    features: [
      'Real-time inventory management across multiple warehouses',
      'Dealer management with order history and credit tracking',
      'Vendor management and procurement workflows',
      'Purchase & sales order processing',
      'Stock reports and low-inventory alerts',
      'Automated invoice generation',
      'QR-code based product lookup and management',
      'Outstanding balance tracking for dealers and vendors',
      'Vendor ledger with full transaction history',
    ],
    featured: true,
    order: 1,
  },
  {
    title: 'Student CRUD API',
    slug: 'student-crud-api',
    tagline: 'A clean, type-safe REST API reference implementation',
    description:
      'A focused REST API for managing student records — built as a clean reference implementation of authentication, validation, and ORM-backed CRUD operations.',
    problem:
      'A baseline API to demonstrate a production-grade backend structure: layered controllers/services, schema validation, authenticated routes, and a properly modeled PostgreSQL schema via Prisma.',
    architecture:
      'Express + TypeScript API with a controller/service/route split, Prisma ORM against PostgreSQL, and JWT-based authentication middleware guarding write operations.',
    image: '/projects/student-crud-api/cover.png',
    screenshots: ['/projects/student-crud-api/screen-1.png'],
    githubUrl: 'https://github.com/rakibakram/student-crud-api',
    liveUrl: null,
    tech: ['Node.js', 'Express', 'Prisma', 'PostgreSQL'],
    features: [
      'RESTful endpoints for full CRUD on student records',
      'Request validation and structured error responses',
      'PostgreSQL schema managed with Prisma migrations',
      'JWT authentication on protected routes',
      'Layered architecture (controllers, services, validators)',
    ],
    featured: false,
    order: 2,
  },
]

const skills: Array<{
  name: string
  category: SkillCategory
  description: string
  level: SkillLevel
  icon: string
  order: number
}> = [
  { name: 'React', category: 'Frontend', description: 'Building responsive and scalable web interfaces.', level: 'Advanced', icon: 'react', order: 0 },
  { name: 'TypeScript', category: 'Frontend', description: 'Writing type-safe, maintainable application code.', level: 'Advanced', icon: 'typescript', order: 1 },
  { name: 'JavaScript', category: 'Frontend', description: 'Core language for interactive, dynamic UIs.', level: 'Advanced', icon: 'javascript', order: 2 },
  { name: 'Tailwind CSS', category: 'Frontend', description: 'Rapidly building consistent, responsive UI systems.', level: 'Advanced', icon: 'tailwind', order: 3 },
  { name: 'HTML5 & CSS3', category: 'Frontend', description: 'Semantic markup and modern styling fundamentals.', level: 'Advanced', icon: 'html5', order: 4 },
  { name: 'Node.js', category: 'Backend', description: 'Building REST APIs and backend services.', level: 'Advanced', icon: 'nodejs', order: 0 },
  { name: 'Express.js', category: 'Backend', description: 'Designing structured, middleware-driven server apps.', level: 'Advanced', icon: 'express', order: 1 },
  { name: 'REST APIs', category: 'Backend', description: 'Architecting clean, versioned, well-documented APIs.', level: 'Advanced', icon: 'api', order: 2 },
  { name: 'Authentication & Authorization', category: 'Backend', description: 'Implementing secure session, token, and role-based access.', level: 'Intermediate', icon: 'shield', order: 3 },
  { name: 'Firebase', category: 'Backend', description: 'Auth, cloud functions, and realtime backend services.', level: 'Intermediate', icon: 'firebase', order: 4 },
  { name: 'PostgreSQL', category: 'Database', description: 'Designing relational databases and scalable data structures.', level: 'Advanced', icon: 'postgresql', order: 0 },
  { name: 'Prisma ORM', category: 'Database', description: 'Type-safe database access and migrations.', level: 'Advanced', icon: 'prisma', order: 1 },
  { name: 'SQLite', category: 'Database', description: 'Lightweight, offline-first embedded storage.', level: 'Intermediate', icon: 'sqlite', order: 2 },
  { name: 'Firebase Firestore', category: 'Database', description: 'NoSQL document storage with realtime sync.', level: 'Intermediate', icon: 'firestore', order: 3 },
  { name: 'Flutter', category: 'Mobile', description: 'Building cross-platform mobile applications.', level: 'Advanced', icon: 'flutter', order: 0 },
  { name: 'Dart', category: 'Mobile', description: 'Core language powering Flutter applications.', level: 'Advanced', icon: 'dart', order: 1 },
  { name: 'Git & GitHub', category: 'Tools', description: 'Version control and collaborative workflows.', level: 'Advanced', icon: 'github', order: 0 },
  { name: 'Docker', category: 'Tools', description: 'Containerizing apps for consistent environments.', level: 'Intermediate', icon: 'docker', order: 1 },
  { name: 'Postman', category: 'Tools', description: 'API testing, documentation, and debugging.', level: 'Advanced', icon: 'postman', order: 2 },
  { name: 'VS Code', category: 'Tools', description: 'Primary editor, tuned for a fast dev workflow.', level: 'Advanced', icon: 'vscode', order: 3 },
  { name: 'Android Studio', category: 'Tools', description: 'Building, debugging, and profiling mobile apps.', level: 'Intermediate', icon: 'androidstudio', order: 4 },
]

const services = [
  { title: 'Full-Stack Web Development', description: 'End-to-end web applications with React, TypeScript, and Node.js — from UI to database.', icon: 'layout-grid', order: 0 },
  { title: 'Flutter Mobile App Development', description: 'Cross-platform mobile apps for iOS and Android from a single Flutter/Dart codebase.', icon: 'smartphone', order: 1 },
  { title: 'Backend & REST API Development', description: 'Secure, well-structured REST APIs built with Express and TypeScript.', icon: 'server', order: 2 },
  { title: 'Database Design', description: 'Relational and NoSQL schema design optimized for scalability and data integrity.', icon: 'database', order: 3 },
  { title: 'Firebase Development', description: 'Authentication, Firestore, Cloud Functions, and real-time data sync.', icon: 'flame', order: 4 },
  { title: 'Admin Dashboards & ERP Systems', description: 'Internal tools and ERP systems for inventory, sales, and operations management.', icon: 'layout-dashboard', order: 5 },
  { title: 'API Integration', description: 'Connecting third-party services, payment gateways, and external APIs into your product.', icon: 'plug', order: 6 },
  { title: 'Bug Fixing & Performance Optimization', description: 'Diagnosing production issues and optimizing performance across the stack.', icon: 'gauge', order: 7 },
]

const timelineItems: Array<{ track: TimelineTrack; year: string; title: string; description: string; order: number }> = [
  { track: 'JOURNEY', year: 'Learning', title: 'Learning', description: 'Studying computer science fundamentals, programming languages, and core CS concepts.', order: 0 },
  { track: 'JOURNEY', year: 'Building', title: 'Building', description: 'Applying fundamentals to real applications — mobile apps, APIs, and databases.', order: 1 },
  { track: 'JOURNEY', year: 'Freelancing', title: 'Freelancing', description: 'Delivering client projects end-to-end, from requirements to deployment.', order: 2 },
  { track: 'JOURNEY', year: 'Full-Stack', title: 'Full-Stack Development', description: 'Designing scalable architectures across frontend, backend, and database layers.', order: 3 },
  { track: 'CAREER', year: '2023', title: 'Started Computer Science Journey', description: 'Began formal computer science education, building a foundation in programming logic, data structures, and problem-solving.', order: 0 },
  { track: 'CAREER', year: '2024', title: 'Programming Fundamentals & Application Development', description: 'Focused on core programming fundamentals while building small applications to reinforce concepts in practice.', order: 1 },
  { track: 'CAREER', year: '2025', title: 'Flutter, Backend & Database Projects', description: 'Started building larger, real-world projects — Flutter mobile apps, backend services, Firebase integrations, and database-driven systems.', order: 2 },
  { track: 'CAREER', year: '2026', title: 'Full-Stack Development & Production Systems', description: 'Focused on full-stack development, scalable software architecture, and shipping production-ready applications.', order: 3 },
]

const profile = {
  id: 1,
  name: 'Rakib Akram',
  role: 'Full-Stack Developer',
  roles: ['Full-Stack Developer', 'Flutter Developer', 'Backend Developer'],
  tagline: 'Building Digital Products That Actually Work.',
  intro:
    'I build scalable, production-ready web and mobile applications with modern frontend, backend, and database technologies.',
  email: 'hello@rakibakram.dev',
  phone: null,
  location: 'Bangladesh',
  resumeUrl: '/resume.pdf',
  githubUsername: 'rakibakram',
  githubUrl: 'https://github.com/rakibakram',
  linkedinUrl: 'https://linkedin.com/in/rakibakram',
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
}

async function main() {
  for (const project of projects) {
    await prisma.project.upsert({ where: { slug: project.slug }, update: project, create: project })
  }

  await prisma.skill.deleteMany()
  await prisma.skill.createMany({ data: skills })

  await prisma.service.deleteMany()
  await prisma.service.createMany({ data: services })

  await prisma.timelineItem.deleteMany()
  await prisma.timelineItem.createMany({ data: timelineItems })

  await prisma.profile.upsert({ where: { id: profile.id }, update: profile, create: profile })

  console.log(
    `Seeded ${projects.length} projects, ${skills.length} skills, ${services.length} services, ${timelineItems.length} timeline items, and the profile.`,
  )
}

main()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

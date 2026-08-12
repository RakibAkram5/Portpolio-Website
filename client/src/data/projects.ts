import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: '1',
    slug: 'taleemplus',
    name: 'TaleemPlus',
    tagline: 'Educational management and learning platform',
    description:
      'A full-featured educational management platform connecting students, teachers, and parents in one place — covering the entire academic workflow from enrollment to results.',
    problem:
      'Schools and tutoring centers relied on scattered spreadsheets, paper records, and manual grading. TaleemPlus centralizes academic operations with role-based portals, automated test generation, and offline-first quizzes so classes keep running even with unreliable connectivity.',
    architecture:
      'Flutter client with an offline-first data layer backed by SQLite, syncing to Firebase (Auth, Firestore, Cloud Storage) when online. An OCR pipeline scans printed documents into structured question banks, and an AI service generates test papers from the scanned content.',
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
    image: '/projects/taleemplus/cover.png',
    screenshots: [
      '/projects/taleemplus/screen-1.png',
      '/projects/taleemplus/screen-2.png',
      '/projects/taleemplus/screen-3.png',
    ],
    githubUrl: 'https://github.com/rakibakram/taleemplus',
    liveUrl: null,
    featured: true,
  },
  {
    id: '2',
    slug: 'srs-godown-erp',
    name: 'SRS Godown ERP',
    tagline: 'Warehouse and inventory management system',
    description:
      'An ERP system for warehouse and distribution operations — tracking stock, dealers, vendors, and finances in real time with a type-safe full-stack architecture.',
    problem:
      'Manual stock registers led to mismatched inventory counts, delayed invoicing, and no visibility into outstanding dealer/vendor balances. SRS Godown ERP replaces that with a single system of record for purchases, sales, and stock movement.',
    architecture:
      'React + TypeScript SPA talking to an Express REST API, with Prisma as the type-safe data layer over PostgreSQL. QR-based product lookups speed up floor operations, and generated PDFs handle invoicing.',
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
    image: '/projects/srs-godown-erp/cover.png',
    screenshots: [
      '/projects/srs-godown-erp/screen-1.png',
      '/projects/srs-godown-erp/screen-2.png',
      '/projects/srs-godown-erp/screen-3.png',
    ],
    githubUrl: 'https://github.com/rakibakram/srs-godown-erp',
    liveUrl: null,
    featured: true,
  },
  {
    id: '3',
    slug: 'student-crud-api',
    name: 'Student CRUD API',
    tagline: 'A clean, type-safe REST API reference implementation',
    description:
      'A focused REST API for managing student records — built as a clean reference implementation of authentication, validation, and ORM-backed CRUD operations.',
    problem:
      'A baseline API to demonstrate a production-grade backend structure: layered controllers/services, schema validation, authenticated routes, and a properly modeled PostgreSQL schema via Prisma.',
    architecture:
      'Express + TypeScript API with a controller/service/route split, Prisma ORM against PostgreSQL, and JWT-based authentication middleware guarding write operations.',
    tech: ['Node.js', 'Express', 'Prisma', 'PostgreSQL'],
    features: [
      'RESTful endpoints for full CRUD on student records',
      'Request validation and structured error responses',
      'PostgreSQL schema managed with Prisma migrations',
      'JWT authentication on protected routes',
      'Layered architecture (controllers, services, validators)',
    ],
    image: '/projects/student-crud-api/cover.png',
    screenshots: ['/projects/student-crud-api/screen-1.png'],
    githubUrl: 'https://github.com/rakibakram/student-crud-api',
    liveUrl: null,
    featured: false,
  },
]

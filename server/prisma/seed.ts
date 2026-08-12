import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const projects = [
  {
    title: 'TaleemPlus',
    slug: 'taleemplus',
    description:
      'Educational management and learning platform with role-based portals, OCR document scanning, AI-assisted test generation, and offline-first quizzes.',
    image: '/projects/taleemplus/cover.png',
    githubUrl: 'https://github.com/rakibakram/taleemplus',
    liveUrl: null,
    tech: ['Flutter', 'Firebase', 'SQLite', 'AI/OCR'],
    featured: true,
  },
  {
    title: 'SRS Godown ERP',
    slug: 'srs-godown-erp',
    description:
      'Warehouse and inventory management ERP with dealer/vendor management, purchase & sales tracking, QR-based products, and invoicing.',
    image: '/projects/srs-godown-erp/cover.png',
    githubUrl: 'https://github.com/rakibakram/srs-godown-erp',
    liveUrl: null,
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL'],
    featured: true,
  },
  {
    title: 'Student CRUD API',
    slug: 'student-crud-api',
    description:
      'A clean, type-safe REST API reference implementation for managing student records with Prisma and PostgreSQL.',
    image: '/projects/student-crud-api/cover.png',
    githubUrl: 'https://github.com/rakibakram/student-crud-api',
    liveUrl: null,
    tech: ['Node.js', 'Express', 'Prisma', 'PostgreSQL'],
    featured: false,
  },
]

async function main() {
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    })
  }
  console.log(`Seeded ${projects.length} projects.`)
}

main()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

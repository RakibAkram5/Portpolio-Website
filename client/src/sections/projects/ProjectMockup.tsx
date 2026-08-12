import { TechIcon } from '@/components/ui/TechIcon'
import type { Project } from '@/types'

const techIconKey: Record<string, string> = {
  Flutter: 'flutter',
  Firebase: 'firebase',
  SQLite: 'sqlite',
  'AI/OCR': 'api',
  React: 'react',
  TypeScript: 'typescript',
  'Node.js': 'nodejs',
  Express: 'express',
  Prisma: 'prisma',
  PostgreSQL: 'postgresql',
}

interface ProjectMockupProps {
  project: Project
  className?: string
}

export function ProjectMockup({ project, className }: ProjectMockupProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-border-strong bg-surface-2 ${className ?? ''}`}>
      <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-rose/60" />
        <span className="h-2 w-2 rounded-full bg-amber/60" />
        <span className="h-2 w-2 rounded-full bg-accent/60" />
        <span className="ml-3 truncate font-mono text-[10px] text-text-muted">
          {project.slug}.rakibakram.dev
        </span>
      </div>

      <div className="relative flex h-52 items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(45,212,191,0.12),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(129,140,248,0.1),transparent_55%)] sm:h-64">
        <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_90%)]" />

        <span className="relative font-mono text-5xl font-bold tracking-tight text-text-primary/10 select-none sm:text-6xl">
          {project.title
            .split(' ')
            .map((w) => w[0])
            .join('')}
        </span>

        <div className="absolute inset-0 flex items-center justify-center gap-3">
          {project.tech.slice(0, 4).map((tech, i) => (
            <div
              key={tech}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-strong bg-surface/90 text-accent shadow-lg animate-float"
              style={{ animationDelay: `${i * 0.5}s` }}
              title={tech}
            >
              <TechIcon name={techIconKey[tech] ?? 'api'} size={19} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

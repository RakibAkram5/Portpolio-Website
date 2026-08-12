import { Monitor, Webhook, Server, Layers, Database, Smartphone, Flame, FolderGit2 } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArchitectureFlow, type FlowNode } from './ArchitectureFlow'

const webStack: FlowNode[] = [
  { label: 'Frontend', description: 'React + TypeScript UI', icon: Monitor },
  { label: 'API Layer', description: 'REST endpoints & validation', icon: Webhook },
  { label: 'Backend Services', description: 'Express business logic', icon: Server },
  { label: 'Prisma ORM', description: 'Type-safe data access', icon: Layers },
  { label: 'PostgreSQL', description: 'Relational data storage', icon: Database },
]

const mobileStack: FlowNode[] = [
  { label: 'Flutter', description: 'Cross-platform mobile UI', icon: Smartphone },
  { label: 'Firebase', description: 'Auth & cloud functions', icon: Flame },
  { label: 'Firestore / SQLite', description: 'Realtime & offline-first storage', icon: FolderGit2 },
]

export function Architecture() {
  return (
    <section id="architecture" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Software Architecture"
          title="How I Build Software"
          description="Beyond UI — every project I build is backed by a deliberate architecture: clean API boundaries, type-safe data access, and a database schema designed to scale."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ArchitectureFlow title="Web Application Stack" nodes={webStack} accentClass="text-accent" />
          <ArchitectureFlow title="Mobile Application Stack" nodes={mobileStack} accentClass="text-violet" />
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { Code2, Layers3, Smartphone, Server } from 'lucide-react'
import { siteConfig } from '@/config/site'

const focusAreas = [
  { label: 'Full-Stack Development', icon: Layers3 },
  { label: 'Flutter Development', icon: Smartphone },
  { label: 'Backend Development', icon: Server },
  { label: 'Software Architecture', icon: Code2 },
]

export function DeveloperCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-border-strong bg-surface p-7 sm:p-8"
    >
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-[90px]" />

      <div className="relative flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 font-mono text-xl font-bold text-accent">
          RA
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">{siteConfig.name}</h3>
          <p className="text-sm text-text-secondary">{siteConfig.roles.join(' · ')}</p>
        </div>
      </div>

      <div className="relative mt-7 grid grid-cols-2 gap-3">
        {focusAreas.map((area) => (
          <div
            key={area.label}
            className="flex items-center gap-2.5 rounded-xl border border-border bg-surface-2/60 px-3.5 py-3 text-xs font-medium text-text-secondary"
          >
            <area.icon size={15} className="shrink-0 text-accent" />
            {area.label}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

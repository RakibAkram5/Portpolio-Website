import { motion } from 'framer-motion'
import { TechIcon } from '@/components/ui/TechIcon'
import type { Skill } from '@/types'

const levelWidth: Record<Skill['level'], string> = {
  Beginner: 'w-1/3',
  Intermediate: 'w-2/3',
  Advanced: 'w-full',
}

interface SkillCardProps {
  skill: Skill
  index: number
}

export function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface/80 p-5 transition-colors duration-300 hover:border-accent/40"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/0 blur-2xl transition-colors duration-500 group-hover:bg-accent/15" />

      <div className="relative flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-strong bg-surface-2 text-text-secondary transition-all duration-300 group-hover:border-accent/50 group-hover:text-accent group-hover:scale-105">
          <TechIcon name={skill.icon} />
        </div>
        <h3 className="font-semibold text-text-primary">{skill.name}</h3>
      </div>

      <p className="relative mt-3.5 text-sm text-text-secondary leading-relaxed">{skill.description}</p>

      <div className="relative mt-4 flex items-center justify-between">
        <span className="text-xs font-mono text-text-muted">{skill.level}</span>
        <div className="h-1 w-20 overflow-hidden rounded-full bg-surface-3">
          <div className={`h-full rounded-full bg-accent transition-all duration-700 ${levelWidth[skill.level]}`} />
        </div>
      </div>
    </motion.div>
  )
}

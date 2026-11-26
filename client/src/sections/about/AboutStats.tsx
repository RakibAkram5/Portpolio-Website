import { motion } from 'framer-motion'
import { CountUp } from '@/components/ui/CountUp'
import type { ProfileStat } from '@/types'

interface AboutStatsProps {
  stats: ProfileStat[]
}

export function AboutStats({ stats }: AboutStatsProps) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="spotlight rounded-2xl border border-border bg-surface/70 px-5 py-4"
        >
          <div className="font-mono text-2xl font-bold text-accent">
            <CountUp value={stat.value} />
          </div>
          <div className="mt-1 text-sm text-text-secondary">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

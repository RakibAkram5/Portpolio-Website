import { motion } from 'framer-motion'

const stats = [
  { value: '3+', label: 'Years Learning & Building' },
  { value: '10+', label: 'Projects' },
  { value: 'Multiple', label: 'Technologies' },
  { value: 'Full-Stack', label: 'Development' },
]

export function AboutStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="mt-10 grid grid-cols-2 gap-4"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-border bg-surface/70 px-5 py-4 transition-colors hover:border-accent/30"
        >
          <div className="font-mono text-2xl font-bold text-accent">{stat.value}</div>
          <div className="mt-1 text-sm text-text-secondary">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  )
}

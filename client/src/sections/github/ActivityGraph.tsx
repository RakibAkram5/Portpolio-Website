import { motion } from 'framer-motion'

interface ActivityGraphProps {
  activity: number[]
}

export function ActivityGraph({ activity }: ActivityGraphProps) {
  const max = Math.max(1, ...activity)

  function intensity(value: number) {
    if (value === 0) return 'bg-surface-3'
    const ratio = value / max
    if (ratio > 0.75) return 'bg-accent'
    if (ratio > 0.4) return 'bg-accent/60'
    return 'bg-accent/30'
  }

  return (
    <div className="flex flex-wrap gap-1.5" role="img" aria-label="Recent public GitHub activity, last 28 days">
      {activity.map((value, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.015 }}
          className={`h-4 w-4 rounded-sm ${intensity(value)}`}
          title={`${value} event${value === 1 ? '' : 's'}`}
        />
      ))}
    </div>
  )
}

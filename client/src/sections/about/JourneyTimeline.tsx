import { motion } from 'framer-motion'
import type { TimelineItem } from '@/types'

interface JourneyTimelineProps {
  items: TimelineItem[]
}

export function JourneyTimeline({ items }: JourneyTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-[13px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/50 via-border-strong to-transparent" />
      <div className="flex flex-col gap-6">
        {items.map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="relative flex items-start gap-4 pl-0"
          >
            <span className="relative z-10 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-surface text-[11px] font-mono font-semibold text-accent">
              {i + 1}
            </span>
            <div>
              <h4 className="text-sm font-semibold text-text-primary">{step.title}</h4>
              <p className="mt-0.5 text-sm text-text-secondary leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

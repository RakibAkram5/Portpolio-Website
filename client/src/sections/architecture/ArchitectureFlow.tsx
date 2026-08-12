import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

export interface FlowNode {
  label: string
  description: string
  icon: LucideIcon
}

interface ArchitectureFlowProps {
  title: string
  nodes: FlowNode[]
  accentClass?: string
}

export function ArchitectureFlow({ title, nodes, accentClass = 'text-accent' }: ArchitectureFlowProps) {
  return (
    <div className="rounded-3xl border border-border-strong bg-surface/70 p-6 sm:p-8">
      <h3 className="mb-8 font-mono text-sm uppercase tracking-[0.2em] text-text-muted">{title}</h3>

      <div className="relative flex flex-col">
        {nodes.map((node, i) => (
          <div key={node.label} className="relative">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative z-10 flex items-center gap-4 rounded-2xl border border-border-strong bg-surface-2/80 px-5 py-4"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border-strong bg-surface ${accentClass}`}>
                <node.icon size={18} />
              </span>
              <div>
                <div className="text-sm font-semibold text-text-primary">{node.label}</div>
                <div className="text-xs text-text-secondary">{node.description}</div>
              </div>
            </motion.div>

            {i < nodes.length - 1 && (
              <div className="relative mx-9 my-1 h-8 w-px overflow-hidden bg-border-strong">
                <motion.span
                  className={`absolute left-1/2 h-3 w-1.5 -translate-x-1/2 rounded-full ${accentClass.replace('text-', 'bg-')}`}
                  animate={{ top: ['-10%', '110%'] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

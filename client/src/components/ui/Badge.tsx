import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface BadgeProps {
  children: ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border-strong bg-surface-2 px-3 py-1 text-xs font-mono text-text-secondary',
        className,
      )}
    >
      {children}
    </span>
  )
}

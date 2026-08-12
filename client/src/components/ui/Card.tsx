import { forwardRef, type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'

type CardProps = Omit<HTMLMotionProps<'div'>, 'children'> & { children?: ReactNode }

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, children, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={cn(
        'group relative rounded-2xl border border-border bg-surface/80 p-6 transition-colors duration-300 hover:border-accent/40',
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(400px_circle_at_var(--x,50%)_var(--y,0%),rgba(45,212,191,0.08),transparent_70%)]" />
      {children}
    </motion.div>
  )
})

Card.displayName = 'Card'

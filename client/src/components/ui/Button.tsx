import { forwardRef, type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref' | 'children'> {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  children?: ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-accent text-bg font-semibold shadow-[0_0_0_1px_rgba(45,212,191,0.4),0_8px_30px_-8px_var(--color-accent-glow)] hover:shadow-[0_0_0_1px_rgba(45,212,191,0.6),0_12px_40px_-6px_var(--color-accent-glow)]',
  secondary:
    'bg-surface-2 text-text-primary border border-border-strong hover:border-accent/60 hover:bg-surface-3',
  ghost: 'text-text-secondary hover:text-accent',
}

const sizeStyles: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon, iconPosition = 'right', children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-200 cursor-pointer',
          'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      </motion.button>
    )
  },
)

Button.displayName = 'Button'

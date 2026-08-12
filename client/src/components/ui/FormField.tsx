import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface FieldWrapperProps {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
}

function FieldWrapper({ label, htmlFor, error, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-text-secondary">
        {label}
      </label>
      {children}
      {error && (
        <span role="alert" className="text-xs text-rose">
          {error}
        </span>
      )}
    </div>
  )
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, id, className, ...props }, ref) => (
    <FieldWrapper label={label} htmlFor={id ?? label} error={error}>
      <input
        ref={ref}
        id={id ?? label}
        aria-invalid={!!error}
        className={cn(
          'rounded-xl border border-border-strong bg-surface-2 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted',
          'transition-colors duration-200 outline-none focus:border-accent/70 focus:ring-2 focus:ring-accent/20',
          error && 'border-rose/60 focus:border-rose/70 focus:ring-rose/20',
          className,
        )}
        {...props}
      />
    </FieldWrapper>
  ),
)
InputField.displayName = 'InputField'

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, id, className, ...props }, ref) => (
    <FieldWrapper label={label} htmlFor={id ?? label} error={error}>
      <textarea
        ref={ref}
        id={id ?? label}
        aria-invalid={!!error}
        className={cn(
          'resize-none rounded-xl border border-border-strong bg-surface-2 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted',
          'transition-colors duration-200 outline-none focus:border-accent/70 focus:ring-2 focus:ring-accent/20',
          error && 'border-rose/60 focus:border-rose/70 focus:ring-rose/20',
          className,
        )}
        {...props}
      />
    </FieldWrapper>
  ),
)
TextareaField.displayName = 'TextareaField'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface AdminPageHeaderProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function AdminPageHeader({ title, description, actionLabel, onAction }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-6 py-6 sm:px-8">
      <div>
        <h1 className="text-xl font-semibold text-text-primary">{title}</h1>
        <p className="mt-1 text-sm text-text-secondary">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button size="md" icon={<Plus size={16} />} iconPosition="left" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

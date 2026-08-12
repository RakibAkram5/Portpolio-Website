import type { ReactNode } from 'react'
import { Pencil, Trash2 } from 'lucide-react'

interface AdminListRowProps {
  title: string
  subtitle?: string
  meta?: ReactNode
  onEdit: () => void
  onDelete: () => void
}

export function AdminListRow({ title, subtitle, meta, onEdit, onDelete }: AdminListRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface/70 px-4 py-3.5">
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          <p className="truncate text-sm font-semibold text-text-primary">{title}</p>
          {meta}
        </div>
        {subtitle && <p className="mt-0.5 truncate text-xs text-text-secondary">{subtitle}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          onClick={onEdit}
          aria-label={`Edit ${title}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-strong text-text-secondary hover:text-accent hover:border-accent/50 cursor-pointer"
        >
          <Pencil size={14} />
        </button>
        <button
          type="button"
          onClick={onDelete}
          aria-label={`Delete ${title}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-strong text-text-secondary hover:text-rose hover:border-rose/50 cursor-pointer"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}

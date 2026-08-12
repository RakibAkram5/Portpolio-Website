import { useState, type FormEvent } from 'react'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { AdminListRow } from '@/components/admin/AdminListRow'
import { Modal } from '@/components/ui/Modal'
import { InputField, TextareaField } from '@/components/ui/FormField'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useAdminCrud } from '@/hooks/useAdminCrud'
import { fetchTimeline } from '@/services/api'
import { timelineAdminApi } from '@/services/adminApi'
import type { TimelineItem, TimelineItemInput, TimelineTrack } from '@/types'

const tracks: TimelineTrack[] = ['JOURNEY', 'CAREER']

const emptyForm: TimelineItemInput = { track: 'CAREER', year: '', title: '', description: '', order: 0 }

export function TimelineAdmin() {
  const { items, loading, error, create, update, remove } = useAdminCrud(fetchTimeline, timelineAdminApi)
  const [editing, setEditing] = useState<TimelineItem | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [form, setForm] = useState<TimelineItemInput>(emptyForm)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const isOpen = isCreating || !!editing

  function openCreate() {
    setForm(emptyForm)
    setFormError('')
    setIsCreating(true)
  }

  function openEdit(item: TimelineItem) {
    setForm(item)
    setFormError('')
    setEditing(item)
  }

  function close() {
    setIsCreating(false)
    setEditing(null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setFormError('')

    const res = editing ? await update(editing.id, form) : await create(form)

    setSubmitting(false)
    if (res.success) {
      close()
    } else {
      setFormError(res.message ?? 'Something went wrong.')
    }
  }

  async function handleDelete(item: TimelineItem) {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return
    await remove(item.id)
  }

  return (
    <div>
      <AdminPageHeader
        title="Timeline"
        description="Journey phases (About section) and career milestones (Experience section)."
        actionLabel="Add Entry"
        onAction={openCreate}
      />

      <div className="px-6 py-6 sm:px-8">
        {loading && <p className="text-sm text-text-secondary">Loading...</p>}
        {error && <p className="text-sm text-rose">{error}</p>}

        <div className="flex flex-col gap-2.5">
          {items.map((item) => (
            <AdminListRow
              key={item.id}
              title={`${item.year} — ${item.title}`}
              subtitle={item.description}
              meta={<Badge>{item.track === 'JOURNEY' ? 'Journey' : 'Career'}</Badge>}
              onEdit={() => openEdit(item)}
              onDelete={() => handleDelete(item)}
            />
          ))}
          {!loading && items.length === 0 && (
            <p className="text-sm text-text-secondary">No timeline entries yet — add your first one.</p>
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={close} labelledBy="timeline-form-title">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <h2 id="timeline-form-title" className="text-lg font-semibold text-text-primary">
            {editing ? 'Edit Timeline Entry' : 'Add Timeline Entry'}
          </h2>

          <div className="mt-6 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="timeline-track" className="text-sm font-medium text-text-secondary">
                Track
              </label>
              <select
                id="timeline-track"
                value={form.track}
                onChange={(e) => setForm({ ...form, track: e.target.value as TimelineTrack })}
                className="rounded-xl border border-border-strong bg-surface-2 px-4 py-3 text-sm text-text-primary outline-none focus:border-accent/70"
              >
                {tracks.map((t) => (
                  <option key={t} value={t}>
                    {t === 'JOURNEY' ? 'Journey (About section)' : 'Career (Experience section)'}
                  </option>
                ))}
              </select>
            </div>

            <InputField
              label="Year / Label"
              id="timeline-year"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              placeholder="e.g. 2026, or Learning"
              required
            />
            <InputField
              label="Title"
              id="timeline-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <TextareaField
              label="Description"
              id="timeline-description"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
            <InputField
              label="Order"
              id="timeline-order"
              type="number"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            />
          </div>

          {formError && <p className="mt-4 text-sm text-rose">{formError}</p>}

          <div className="mt-7 flex gap-3">
            <Button type="submit" disabled={submitting} className="disabled:opacity-60">
              {submitting ? 'Saving...' : 'Save'}
            </Button>
            <Button type="button" variant="secondary" onClick={close}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

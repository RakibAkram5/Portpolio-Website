import { useState, type FormEvent } from 'react'
import { formatApiError } from '@/utils/formatApiError'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { AdminListRow } from '@/components/admin/AdminListRow'
import { Modal } from '@/components/ui/Modal'
import { InputField, TextareaField } from '@/components/ui/FormField'
import { Button } from '@/components/ui/Button'
import { useAdminCrud } from '@/hooks/useAdminCrud'
import { fetchServices } from '@/services/api'
import { serviceAdminApi } from '@/services/adminApi'
import type { Service, ServiceInput } from '@/types'

const emptyForm: ServiceInput = { title: '', description: '', icon: 'server', order: 0 }

export function ServicesAdmin() {
  const { items, loading, error, create, update, remove } = useAdminCrud(fetchServices, serviceAdminApi)
  const [editing, setEditing] = useState<Service | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [form, setForm] = useState<ServiceInput>(emptyForm)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const isOpen = isCreating || !!editing

  function openCreate() {
    setForm(emptyForm)
    setFormError('')
    setIsCreating(true)
  }

  function openEdit(service: Service) {
    setForm(service)
    setFormError('')
    setEditing(service)
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
      setFormError(formatApiError(res))
    }
  }

  async function handleDelete(service: Service) {
    if (!window.confirm(`Delete "${service.title}"? This cannot be undone.`)) return
    await remove(service.id)
  }

  return (
    <div>
      <AdminPageHeader
        title="Services"
        description="What you offer, shown in the Services section."
        actionLabel="Add Service"
        onAction={openCreate}
      />

      <div className="px-6 py-6 sm:px-8">
        {loading && <p className="text-sm text-text-secondary">Loading...</p>}
        {error && <p className="text-sm text-rose">{error}</p>}

        <div className="flex flex-col gap-2.5">
          {items.map((service) => (
            <AdminListRow
              key={service.id}
              title={service.title}
              subtitle={service.description}
              onEdit={() => openEdit(service)}
              onDelete={() => handleDelete(service)}
            />
          ))}
          {!loading && items.length === 0 && (
            <p className="text-sm text-text-secondary">No services yet — add your first one.</p>
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={close} labelledBy="service-form-title">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <h2 id="service-form-title" className="text-lg font-semibold text-text-primary">
            {editing ? 'Edit Service' : 'Add Service'}
          </h2>

          <div className="mt-6 flex flex-col gap-5">
            <InputField
              label="Title"
              id="service-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <TextareaField
              label="Description"
              id="service-description"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
            <InputField
              label="Icon key"
              id="service-icon"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              placeholder="e.g. server, database, smartphone"
              required
            />
            <InputField
              label="Order"
              id="service-order"
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

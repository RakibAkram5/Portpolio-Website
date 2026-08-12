import { useState, type FormEvent } from 'react'
import { formatApiError } from '@/utils/formatApiError'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { AdminListRow } from '@/components/admin/AdminListRow'
import { Modal } from '@/components/ui/Modal'
import { InputField, TextareaField } from '@/components/ui/FormField'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useAdminCrud } from '@/hooks/useAdminCrud'
import { fetchSkills } from '@/services/api'
import { skillAdminApi } from '@/services/adminApi'
import type { Skill, SkillCategory, SkillInput, SkillLevel } from '@/types'

const categories: SkillCategory[] = ['Frontend', 'Backend', 'Database', 'Mobile', 'Tools']
const levels: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced']

const emptyForm: SkillInput = {
  name: '',
  category: 'Frontend',
  description: '',
  level: 'Intermediate',
  icon: 'react',
  order: 0,
}

export function SkillsAdmin() {
  const { items, loading, error, create, update, remove } = useAdminCrud(fetchSkills, skillAdminApi)
  const [editing, setEditing] = useState<Skill | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [form, setForm] = useState<SkillInput>(emptyForm)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const isOpen = isCreating || !!editing

  function openCreate() {
    setForm(emptyForm)
    setFormError('')
    setIsCreating(true)
  }

  function openEdit(skill: Skill) {
    setForm(skill)
    setFormError('')
    setEditing(skill)
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

  async function handleDelete(skill: Skill) {
    if (!window.confirm(`Delete "${skill.name}"? This cannot be undone.`)) return
    await remove(skill.id)
  }

  return (
    <div>
      <AdminPageHeader
        title="Skills"
        description="Technologies shown in the Skills section, grouped by category."
        actionLabel="Add Skill"
        onAction={openCreate}
      />

      <div className="px-6 py-6 sm:px-8">
        {loading && <p className="text-sm text-text-secondary">Loading...</p>}
        {error && <p className="text-sm text-rose">{error}</p>}

        <div className="flex flex-col gap-2.5">
          {items.map((skill) => (
            <AdminListRow
              key={skill.id}
              title={skill.name}
              subtitle={skill.description}
              meta={<Badge>{skill.category}</Badge>}
              onEdit={() => openEdit(skill)}
              onDelete={() => handleDelete(skill)}
            />
          ))}
          {!loading && items.length === 0 && (
            <p className="text-sm text-text-secondary">No skills yet — add your first one.</p>
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={close} labelledBy="skill-form-title">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <h2 id="skill-form-title" className="text-lg font-semibold text-text-primary">
            {editing ? 'Edit Skill' : 'Add Skill'}
          </h2>

          <div className="mt-6 flex flex-col gap-5">
            <InputField
              label="Name"
              id="skill-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="skill-category" className="text-sm font-medium text-text-secondary">
                  Category
                </label>
                <select
                  id="skill-category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as SkillCategory })}
                  className="rounded-xl border border-border-strong bg-surface-2 px-4 py-3 text-sm text-text-primary outline-none focus:border-accent/70"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="skill-level" className="text-sm font-medium text-text-secondary">
                  Level
                </label>
                <select
                  id="skill-level"
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value as SkillLevel })}
                  className="rounded-xl border border-border-strong bg-surface-2 px-4 py-3 text-sm text-text-primary outline-none focus:border-accent/70"
                >
                  {levels.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <TextareaField
              label="Description"
              id="skill-description"
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />

            <InputField
              label="Icon key"
              id="skill-icon"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              placeholder="e.g. react, nodejs, postgresql"
              required
            />

            <InputField
              label="Order"
              id="skill-order"
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

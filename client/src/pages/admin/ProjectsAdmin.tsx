import { useState, type FormEvent } from 'react'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { AdminListRow } from '@/components/admin/AdminListRow'
import { Modal } from '@/components/ui/Modal'
import { InputField, TextareaField } from '@/components/ui/FormField'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useAdminCrud } from '@/hooks/useAdminCrud'
import { fetchProjects } from '@/services/api'
import { projectAdminApi } from '@/services/adminApi'
import type { Project, ProjectInput } from '@/types'

type ProjectFormState = Omit<ProjectInput, 'tech' | 'features' | 'screenshots' | 'liveUrl'> & {
  tech: string
  features: string
  screenshots: string
  liveUrl: string
}

const emptyForm: ProjectFormState = {
  title: '',
  slug: '',
  tagline: '',
  description: '',
  problem: '',
  architecture: '',
  image: '',
  screenshots: '',
  githubUrl: '',
  liveUrl: '',
  tech: '',
  features: '',
  featured: false,
  order: 0,
}

function toFormState(project: Project): ProjectFormState {
  return {
    ...project,
    tech: project.tech.join(', '),
    features: project.features.join('\n'),
    screenshots: project.screenshots.join('\n'),
    liveUrl: project.liveUrl ?? '',
  }
}

function toInput(form: ProjectFormState): ProjectInput {
  return {
    ...form,
    tech: form.tech.split(',').map((s) => s.trim()).filter(Boolean),
    features: form.features.split('\n').map((s) => s.trim()).filter(Boolean),
    screenshots: form.screenshots.split('\n').map((s) => s.trim()).filter(Boolean),
    liveUrl: form.liveUrl.trim() || null,
  }
}

export function ProjectsAdmin() {
  const { items, loading, error, create, update, remove } = useAdminCrud(fetchProjects, projectAdminApi)
  const [editing, setEditing] = useState<Project | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [form, setForm] = useState<ProjectFormState>(emptyForm)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const isOpen = isCreating || !!editing

  function openCreate() {
    setForm(emptyForm)
    setFormError('')
    setIsCreating(true)
  }

  function openEdit(project: Project) {
    setForm(toFormState(project))
    setFormError('')
    setEditing(project)
  }

  function close() {
    setIsCreating(false)
    setEditing(null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setFormError('')

    const input = toInput(form)
    const res = editing ? await update(editing.id, input) : await create(input)

    setSubmitting(false)
    if (res.success) {
      close()
    } else {
      setFormError(res.message ?? 'Something went wrong.')
    }
  }

  async function handleDelete(project: Project) {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return
    await remove(project.id)
  }

  return (
    <div>
      <AdminPageHeader
        title="Projects"
        description="Featured work shown in the Projects section."
        actionLabel="Add Project"
        onAction={openCreate}
      />

      <div className="px-6 py-6 sm:px-8">
        {loading && <p className="text-sm text-text-secondary">Loading...</p>}
        {error && <p className="text-sm text-rose">{error}</p>}

        <div className="flex flex-col gap-2.5">
          {items.map((project) => (
            <AdminListRow
              key={project.id}
              title={project.title}
              subtitle={project.tagline}
              meta={project.featured ? <Badge>Featured</Badge> : undefined}
              onEdit={() => openEdit(project)}
              onDelete={() => handleDelete(project)}
            />
          ))}
          {!loading && items.length === 0 && (
            <p className="text-sm text-text-secondary">No projects yet — add your first one.</p>
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={close} labelledBy="project-form-title">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <h2 id="project-form-title" className="text-lg font-semibold text-text-primary">
            {editing ? 'Edit Project' : 'Add Project'}
          </h2>

          <div className="mt-6 flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <InputField
                label="Title"
                id="project-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <InputField
                label="Slug"
                id="project-slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="lowercase-with-hyphens"
                required
              />
            </div>

            <InputField
              label="Tagline"
              id="project-tagline"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            />

            <TextareaField
              label="Description"
              id="project-description"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />

            <TextareaField
              label="Problem Solved"
              id="project-problem"
              rows={3}
              value={form.problem}
              onChange={(e) => setForm({ ...form, problem: e.target.value })}
            />

            <TextareaField
              label="Architecture"
              id="project-architecture"
              rows={3}
              value={form.architecture}
              onChange={(e) => setForm({ ...form, architecture: e.target.value })}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <InputField
                label="GitHub URL"
                id="project-github"
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                required
              />
              <InputField
                label="Live Demo URL (optional)"
                id="project-live"
                value={form.liveUrl}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
              />
            </div>

            <InputField
              label="Cover image path"
              id="project-image"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="/projects/my-project/cover.png"
              required
            />

            <TextareaField
              label="Screenshot paths (one per line)"
              id="project-screenshots"
              rows={3}
              value={form.screenshots}
              onChange={(e) => setForm({ ...form, screenshots: e.target.value })}
            />

            <InputField
              label="Tech stack (comma-separated)"
              id="project-tech"
              value={form.tech}
              onChange={(e) => setForm({ ...form, tech: e.target.value })}
              placeholder="React, TypeScript, Node.js"
              required
            />

            <TextareaField
              label="Features (one per line)"
              id="project-features"
              rows={4}
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center gap-2.5 text-sm font-medium text-text-secondary">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="h-4 w-4 accent-accent"
                />
                Featured
              </label>
              <InputField
                label="Order"
                id="project-order"
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              />
            </div>
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

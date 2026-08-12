import { useEffect, useState, type FormEvent } from 'react'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { InputField, TextareaField } from '@/components/ui/FormField'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { fetchProfile } from '@/services/api'
import { updateProfile } from '@/services/adminApi'
import type { Profile } from '@/types'

type ProfileFormState = Omit<Profile, 'roles' | 'aboutParagraphs' | 'stats'> & {
  roles: string
  aboutParagraphs: string
  stats: string
}

const emptyForm: ProfileFormState = {
  name: '',
  role: '',
  roles: '',
  tagline: '',
  intro: '',
  email: '',
  location: '',
  resumeUrl: '',
  githubUsername: '',
  githubUrl: '',
  linkedinUrl: '',
  aboutHeading: '',
  aboutParagraphs: '',
  stats: '',
}

function toFormState(profile: Profile): ProfileFormState {
  return {
    ...profile,
    roles: profile.roles.join(', '),
    aboutParagraphs: profile.aboutParagraphs.join('\n\n'),
    stats: profile.stats.map((s) => `${s.value} | ${s.label}`).join('\n'),
  }
}

function toInput(form: ProfileFormState): Partial<Profile> {
  return {
    ...form,
    roles: form.roles.split(',').map((s) => s.trim()).filter(Boolean),
    aboutParagraphs: form.aboutParagraphs.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
    stats: form.stats
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [value, label] = line.split('|').map((s) => s.trim())
        return { value: value ?? '', label: label ?? '' }
      }),
  }
}

export function ProfileAdmin() {
  const { token } = useAuth()
  const [form, setForm] = useState<ProfileFormState>(emptyForm)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchProfile().then((res) => {
      if (res.success && res.data) {
        setForm(toFormState(res.data))
      } else {
        setError(res.message ?? 'Failed to load profile.')
      }
      setLoading(false)
    })
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!token) return

    setSubmitting(true)
    setError('')
    setSuccess(false)

    const res = await updateProfile(token, toInput(form))

    setSubmitting(false)
    if (res.success) {
      setSuccess(true)
    } else {
      setError(res.message ?? 'Something went wrong.')
    }
  }

  return (
    <div>
      <AdminPageHeader title="Profile" description="Hero, About, and identity content shown across the site." />

      <div className="px-6 py-6 sm:px-8">
        {loading ? (
          <p className="text-sm text-text-secondary">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl">
            <div className="grid gap-5 sm:grid-cols-2">
              <InputField label="Name" id="profile-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <InputField label="Primary role" id="profile-role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
            </div>

            <div className="mt-5">
              <InputField
                label="Roles (comma-separated, shown in hero badge)"
                id="profile-roles"
                value={form.roles}
                onChange={(e) => setForm({ ...form, roles: e.target.value })}
                required
              />
            </div>

            <div className="mt-5">
              <InputField label="Hero tagline" id="profile-tagline" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} required />
            </div>

            <div className="mt-5">
              <TextareaField label="Hero intro" id="profile-intro" rows={3} value={form.intro} onChange={(e) => setForm({ ...form, intro: e.target.value })} required />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <InputField label="Email" id="profile-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <InputField label="Location" id="profile-location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
            </div>

            <div className="mt-5">
              <InputField label="Resume URL" id="profile-resume" value={form.resumeUrl} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} required />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <InputField label="GitHub username" id="profile-gh-user" value={form.githubUsername} onChange={(e) => setForm({ ...form, githubUsername: e.target.value })} required />
              <InputField label="GitHub URL" id="profile-gh-url" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} required />
              <InputField label="LinkedIn URL" id="profile-li-url" value={form.linkedinUrl} onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })} required />
            </div>

            <div className="mt-5">
              <InputField label="About heading" id="profile-about-heading" value={form.aboutHeading} onChange={(e) => setForm({ ...form, aboutHeading: e.target.value })} required />
            </div>

            <div className="mt-5">
              <TextareaField
                label="About paragraphs (blank line between paragraphs)"
                id="profile-about-paragraphs"
                rows={6}
                value={form.aboutParagraphs}
                onChange={(e) => setForm({ ...form, aboutParagraphs: e.target.value })}
                required
              />
            </div>

            <div className="mt-5">
              <TextareaField
                label="Stats (one per line, format: value | label)"
                id="profile-stats"
                rows={4}
                value={form.stats}
                onChange={(e) => setForm({ ...form, stats: e.target.value })}
                placeholder={'3+ | Years Learning & Building\n10+ | Projects'}
                required
              />
            </div>

            {error && <p className="mt-4 text-sm text-rose">{error}</p>}
            {success && <p className="mt-4 text-sm text-accent">Profile updated.</p>}

            <Button type="submit" disabled={submitting} className="mt-7 disabled:opacity-60">
              {submitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

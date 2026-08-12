import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { Lock, AlertCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { InputField } from '@/components/ui/FormField'
import { Button } from '@/components/ui/Button'

export function AdminLogin() {
  const { login, isAuthenticated, isChecking } = useAuth()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!isChecking && isAuthenticated) {
    return <Navigate to="/admin/projects" replace />
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const res = await login(password)
    setSubmitting(false)

    if (!res.success) {
      setError(res.message ?? 'Login failed.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-border-strong bg-surface/80 p-8"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
          <Lock size={20} />
        </div>
        <h1 className="mt-5 text-center text-xl font-semibold text-text-primary">Admin Login</h1>
        <p className="mt-1.5 text-center text-sm text-text-secondary">Sign in to manage portfolio content.</p>

        <div className="mt-7">
          <InputField
            label="Password"
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
          />
        </div>

        {error && (
          <p className="mt-4 flex items-center gap-1.5 text-sm text-rose">
            <AlertCircle size={15} />
            {error}
          </p>
        )}

        <Button type="submit" disabled={submitting} className="mt-6 w-full disabled:opacity-60">
          {submitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </div>
  )
}

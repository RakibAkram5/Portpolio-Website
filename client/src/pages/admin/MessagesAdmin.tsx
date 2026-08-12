import { useEffect, useState } from 'react'
import { Mail, Trash2, ChevronDown } from 'lucide-react'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { useAuth } from '@/hooks/useAuth'
import { deleteContactMessage, fetchContactMessages } from '@/services/adminApi'
import type { ContactMessage } from '@/types'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export function MessagesAdmin() {
  const { token } = useAuth()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  async function load() {
    if (!token) return
    setLoading(true)
    const res = await fetchContactMessages(token)
    if (res.success && res.data) {
      setMessages(res.data)
      setError('')
    } else {
      setError(res.message ?? 'Failed to load messages.')
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [token])

  async function handleDelete(message: ContactMessage) {
    if (!token) return
    if (!window.confirm(`Delete message from "${message.name}"? This cannot be undone.`)) return
    await deleteContactMessage(token, message.id)
    await load()
  }

  return (
    <div>
      <AdminPageHeader
        title="Messages"
        description="Inquiries submitted through the site's contact form."
      />

      <div className="px-6 py-6 sm:px-8">
        {loading && <p className="text-sm text-text-secondary">Loading...</p>}
        {error && <p className="text-sm text-rose">{error}</p>}

        <div className="flex flex-col gap-2.5">
          {messages.map((message) => {
            const isExpanded = expandedId === message.id
            return (
              <div key={message.id} className="rounded-xl border border-border bg-surface/70">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : message.id)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <p className="truncate text-sm font-semibold text-text-primary">{message.subject}</p>
                      <span className="shrink-0 text-xs text-text-muted">{formatDate(message.createdAt)}</span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-text-secondary">
                      {message.name} · {message.email}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <a
                      href={`mailto:${message.email}`}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Email ${message.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-strong text-text-secondary hover:text-accent hover:border-accent/50"
                    >
                      <Mail size={14} />
                    </a>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(message)
                      }}
                      aria-label={`Delete message from ${message.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-strong text-text-secondary hover:text-rose hover:border-rose/50 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                    <ChevronDown
                      size={16}
                      className={`text-text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-border px-4 py-4">
                    <p className="whitespace-pre-wrap text-sm text-text-secondary leading-relaxed">
                      {message.message}
                    </p>
                  </div>
                )}
              </div>
            )
          })}

          {!loading && messages.length === 0 && (
            <p className="text-sm text-text-secondary">No messages yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

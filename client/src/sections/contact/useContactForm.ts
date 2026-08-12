import { useState, type FormEvent } from 'react'
import { sendContactMessage } from '@/services/api'
import type { ContactFormData } from '@/types'

type Errors = Partial<Record<keyof ContactFormData, string>>
type Status = 'idle' | 'submitting' | 'success' | 'error'

const initialData: ContactFormData = { name: '', email: '', subject: '', message: '' }

function validate(data: ContactFormData): Errors {
  const errors: Errors = {}

  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Please enter your name.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!data.subject.trim() || data.subject.trim().length < 3) {
    errors.subject = 'Please enter a subject.'
  }

  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.'
  }

  return errors
}

export function useContactForm() {
  const [data, setData] = useState<ContactFormData>(initialData)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  function updateField(field: keyof ContactFormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const validationErrors = validate(data)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setStatus('submitting')
    const res = await sendContactMessage(data)

    if (res.success) {
      setStatus('success')
      setStatusMessage("Message sent — I'll get back to you soon.")
      setData(initialData)
    } else {
      setStatus('error')
      setStatusMessage(res.message ?? 'Something went wrong. Please try again.')
      if (res.errors) setErrors(res.errors as Errors)
    }
  }

  return { data, errors, status, statusMessage, updateField, handleSubmit }
}

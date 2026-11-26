import { useRef, useState, type DragEvent } from 'react'
import { ImageUp, Loader2, Trash2, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

const MAX_DIMENSION = 900
const MAX_SOURCE_BYTES = 15 * 1024 * 1024

/** Downscales the image in the browser and re-encodes it (WebP, JPEG fallback) to keep uploads small. */
async function compressImage(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas is not supported in this browser.')
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()

  const webp = canvas.toDataURL('image/webp', 0.88)
  // Browsers without WebP encoding silently return PNG; JPEG is much smaller for photos.
  return webp.startsWith('data:image/webp') ? webp : canvas.toDataURL('image/jpeg', 0.88)
}

interface PhotoUploaderProps {
  currentUrl: string | null
  onUpload: (dataUrl: string) => Promise<{ success: boolean; message?: string }>
  onRemove: () => Promise<{ success: boolean; message?: string }>
}

export function PhotoUploader({ currentUrl, onUpload, onRemove }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [busy, setBusy] = useState<'upload' | 'remove' | null>(null)
  const [dragging, setDragging] = useState(false)
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null)

  const shown = preview ?? currentUrl

  async function handleFile(file: File | undefined) {
    if (!file) return
    setMessage(null)
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please choose an image file (JPG, PNG or WebP).' })
      return
    }
    if (file.size > MAX_SOURCE_BYTES) {
      setMessage({ type: 'error', text: 'That file is larger than 15 MB.' })
      return
    }
    try {
      setPreview(await compressImage(file))
    } catch {
      setMessage({ type: 'error', text: 'Could not read that image. Try a different file.' })
    }
  }

  async function handleUpload() {
    if (!preview) return
    setBusy('upload')
    const res = await onUpload(preview)
    setBusy(null)
    if (res.success) {
      setPreview(null)
      setMessage({ type: 'ok', text: 'Photo updated — it is live on your site now.' })
    } else {
      setMessage({ type: 'error', text: res.message ?? 'Upload failed.' })
    }
  }

  async function handleRemove() {
    setBusy('remove')
    const res = await onRemove()
    setBusy(null)
    setMessage(res.success ? { type: 'ok', text: 'Photo removed.' } : { type: 'error', text: res.message ?? 'Could not remove photo.' })
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div className="rounded-2xl border border-border-strong bg-surface/60 p-5">
      <h2 className="text-sm font-semibold text-text-primary">Profile photo</h2>
      <p className="mt-1 text-xs text-text-muted">Shown in the hero and About sections. A square, well-lit headshot works best.</p>

      <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'group relative flex h-36 w-36 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-colors',
            dragging ? 'border-accent bg-accent/10' : 'border-border-strong bg-surface-2 hover:border-accent/60',
          )}
          aria-label="Choose a profile photo"
        >
          {shown ? (
            <img src={shown} alt="Profile photo preview" className="h-full w-full object-cover" />
          ) : (
            <UserRound size={44} className="text-text-muted" />
          )}
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-bg/70 text-xs font-medium text-text-primary opacity-0 transition-opacity group-hover:opacity-100">
            <ImageUp size={18} />
            {shown ? 'Change' : 'Choose photo'}
          </span>
        </button>

        <div className="flex flex-col gap-3">
          <p className="text-xs text-text-secondary">Click the box or drag an image onto it. It is resized automatically before upload.</p>
          <div className="flex flex-wrap gap-2">
            {preview ? (
              <>
                <Button type="button" onClick={handleUpload} disabled={busy !== null} icon={busy === 'upload' ? <Loader2 size={15} className="animate-spin" /> : <ImageUp size={15} />} iconPosition="left" className="disabled:opacity-60">
                  {busy === 'upload' ? 'Uploading…' : 'Upload photo'}
                </Button>
                <Button type="button" variant="secondary" onClick={() => setPreview(null)} disabled={busy !== null}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button type="button" variant="secondary" onClick={() => inputRef.current?.click()} icon={<ImageUp size={15} />} iconPosition="left">
                  {currentUrl ? 'Replace photo' : 'Choose photo'}
                </Button>
                {currentUrl && (
                  <Button type="button" variant="ghost" onClick={handleRemove} disabled={busy !== null} icon={<Trash2 size={15} />} iconPosition="left" className="hover:text-rose disabled:opacity-60">
                    {busy === 'remove' ? 'Removing…' : 'Remove'}
                  </Button>
                )}
              </>
            )}
          </div>
          {message && <p className={cn('text-xs', message.type === 'ok' ? 'text-accent' : 'text-rose')}>{message.text}</p>}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,image/*"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0])
          e.target.value = ''
        }}
      />
    </div>
  )
}

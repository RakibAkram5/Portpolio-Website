import { useEffect } from 'react'

/** One document-level listener feeding the pointer position to whichever `.spotlight` card is hovered. */
export function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    function handleMove(e: PointerEvent) {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>('.spotlight')
      if (!card) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
      card.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }

    document.addEventListener('pointermove', handleMove, { passive: true })
    return () => document.removeEventListener('pointermove', handleMove)
  }, [])
}

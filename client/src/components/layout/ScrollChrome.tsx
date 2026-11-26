import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { scrollToSection } from '@/hooks/useLenis'

/** Thin reading-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent via-accent-soft to-violet"
    />
  )
}

/** Soft accent glow that trails the cursor on devices with a precise pointer. */
export function CursorGlow() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 120, damping: 22 })
  const sy = useSpring(y, { stiffness: 120, damping: 22 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)
    function move(e: PointerEvent) {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  if (!enabled) return null
  return (
    <motion.div
      aria-hidden="true"
      style={{ left: sx, top: sy }}
      className="pointer-events-none fixed z-0 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-[100px]"
    />
  )
}

export function BackToTop() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)

  useEffect(() => scrollY.on('change', (v) => setVisible(v > 900)), [scrollY])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => scrollToSection('#home')}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="glass fixed bottom-6 right-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-accent shadow-lg shadow-black/30 hover:border-accent/50"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

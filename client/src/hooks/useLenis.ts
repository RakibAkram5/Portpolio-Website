import { useEffect } from 'react'
import Lenis from 'lenis'

let lenis: Lenis | null = null

const NAV_OFFSET = -72

/**
 * Smoothly scrolls to a section (e.g. "#projects"). Goes through Lenis when it's running —
 * native smooth scrollIntoView fights Lenis' own scroll loop and stutters or stops short.
 */
export function scrollToSection(href: string) {
  const target = document.querySelector<HTMLElement>(href)
  if (!target) return
  if (lenis) {
    lenis.scrollTo(target, { offset: href === '#home' ? 0 : NAV_OFFSET, duration: 1.2 })
  } else {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }
  history.replaceState(null, '', href === '#home' ? window.location.pathname : href)
}

export function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenis = instance

    let rafId = 0
    function raf(time: number) {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Honour a deep link like /#contact once the page has rendered.
    if (window.location.hash) {
      const hash = window.location.hash
      setTimeout(() => scrollToSection(hash), 300)
    }

    return () => {
      cancelAnimationFrame(rafId)
      instance.destroy()
      if (lenis === instance) lenis = null
    }
  }, [])
}

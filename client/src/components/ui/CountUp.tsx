import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

/**
 * Counts up the numeric part of a stat like "10+" or "3.5k" when scrolled into view.
 * Non-numeric values ("Full-Stack") render unchanged.
 */
export function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const match = /^(\D*)(\d+(?:\.\d+)?)(.*)$/.exec(value)
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value)

  useEffect(() => {
    if (!match) {
      setDisplay(value)
      return
    }
    if (!inView) return
    const [, prefix, num, suffix] = match
    const target = Number(num)
    const decimals = num.includes('.') ? num.split('.')[1].length : 0
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`),
    })
    return () => controls.stop()
    // match is derived from value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, duration])

  return <span ref={ref}>{display}</span>
}

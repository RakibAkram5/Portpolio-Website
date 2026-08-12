import { useRef, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, MessageSquare, CircleDot } from 'lucide-react'
import { useProfile } from '@/hooks/useProfile'
import { Button } from '@/components/ui/Button'
import { Magnetic } from '@/components/ui/Magnetic'
import { HeroVisual } from './HeroVisual'

function splitHeadline(text: string, highlightWords = 2) {
  const words = text.trim().split(' ')
  const lead = words.slice(0, -highlightWords).join(' ')
  const highlight = words.slice(-highlightWords).join(' ')
  return { lead, highlight }
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero() {
  const { data: profile } = useProfile()
  const { lead, highlight } = splitHeadline(profile.tagline)
  const sectionRef = useRef<HTMLElement>(null)
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [4, -4]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-4, 4]), { stiffness: 150, damping: 20 })

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mvX.set((e.clientX - rect.left) / rect.width - 0.5)
    mvY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function scrollTo(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 sm:pt-32"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-2/70 px-4 py-1.5 font-mono text-xs text-text-secondary"
          >
            <CircleDot size={12} className="text-accent animate-pulse-slow" />
            {profile.roles.join(' · ')}
          </motion.div>

          <motion.h1
            variants={item}
            className="text-[2.5rem] sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight text-text-primary"
          >
            {lead} <span className="text-gradient">{highlight}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-base sm:text-lg text-text-secondary leading-relaxed">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button size="lg" icon={<ArrowRight size={17} />} onClick={() => scrollTo('#projects')}>
                View My Work
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                size="lg"
                variant="secondary"
                icon={<MessageSquare size={16} />}
                iconPosition="left"
                onClick={() => scrollTo('#contact')}
              >
                Let&apos;s Work Together
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-2.5 text-sm text-text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for freelance &amp; development opportunities
          </motion.div>
        </motion.div>

        <motion.div
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block"
        >
          <HeroVisual />
        </motion.div>
        <div className="lg:hidden">
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}

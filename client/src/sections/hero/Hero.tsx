import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MessageSquare, FileDown, ChevronDown } from 'lucide-react'
import { useProfile } from '@/hooks/useProfile'
import { scrollToSection } from '@/hooks/useLenis'
import { Button } from '@/components/ui/Button'
import { Magnetic } from '@/components/ui/Magnetic'
import { GithubIcon, LinkedinIcon } from '@/components/icons/BrandIcons'
import { HeroVisual } from './HeroVisual'

const EASE = [0.22, 1, 0.36, 1] as const

function splitHeadline(text: string, highlightWords = 2) {
  const words = text.trim().split(/\s+/)
  const cut = Math.max(0, words.length - highlightWords)
  return { lead: words.slice(0, cut), highlight: words.slice(cut) }
}

function RotatingRole({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (roles.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600)
    return () => clearInterval(id)
  }, [roles.length])

  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[index % roles.length]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="whitespace-nowrap text-accent"
        >
          {roles[index % roles.length]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const word = {
  hidden: { opacity: 0, y: '0.6em', filter: 'blur(8px)' },
  show: (i: number) => ({
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE, delay: 0.35 + i * 0.07 },
  }),
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
})

export function Hero() {
  const { data: profile } = useProfile()
  const { lead, highlight } = splitHeadline(profile.tagline)
  const firstName = profile.name.split(' ').slice(-2).join(' ')

  // Gentle parallax as the hero scrolls away.
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 600], [0, 80])
  const visualY = useTransform(scrollY, [0, 600], [0, -40])
  const fade = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:px-8">
        <motion.div style={{ y: contentY, opacity: fade }} className="order-2 lg:order-1">
          <motion.div
            {...fadeUp(0.1)}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-surface-2/70 py-1.5 pl-2 pr-4 text-xs text-text-secondary backdrop-blur"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-0.5 font-medium text-accent">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Available
            </span>
            <span className="font-mono">Open to freelance &amp; full-time roles</span>
          </motion.div>

          <motion.p {...fadeUp(0.2)} className="mb-4 font-mono text-sm text-text-secondary sm:text-base">
            Hi, I&apos;m <span className="font-semibold text-text-primary">{firstName}</span> —{' '}
            <RotatingRole roles={profile.roles.length ? profile.roles : [profile.role]} />
          </motion.p>

          <h1 className="text-[2.6rem] font-bold leading-[1.05] tracking-tight text-text-primary sm:text-6xl lg:text-[4.1rem]">
            {lead.map((w, i) => (
              <motion.span key={`l-${i}`} custom={i} variants={word} initial="hidden" animate="show" className="mr-[0.25em] inline-block">
                {w}
              </motion.span>
            ))}
            {highlight.map((w, i) => (
              <motion.span
                key={`h-${i}`}
                custom={lead.length + i}
                variants={word}
                initial="hidden"
                animate="show"
                className="text-shimmer mr-[0.25em] inline-block pb-1"
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p {...fadeUp(0.75)} className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            {profile.intro}
          </motion.p>

          <motion.div {...fadeUp(0.9)} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button size="lg" icon={<ArrowRight size={17} />} onClick={() => scrollToSection('#projects')}>
                View My Work
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                size="lg"
                variant="secondary"
                icon={<MessageSquare size={16} />}
                iconPosition="left"
                onClick={() => scrollToSection('#contact')}
              >
                Let&apos;s Work Together
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div {...fadeUp(1.05)} className="mt-9 flex items-center gap-5 text-text-muted">
            <span className="h-px w-10 bg-border-strong" />
            {[
              { href: profile.githubUrl, label: 'GitHub', icon: <GithubIcon size={18} /> },
              { href: profile.linkedinUrl, label: 'LinkedIn', icon: <LinkedinIcon size={18} /> },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                whileHover={{ y: -3 }}
                className="transition-colors hover:text-accent"
              >
                {s.icon}
              </motion.a>
            ))}
            <motion.a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3 }}
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent"
            >
              <FileDown size={16} />
              Resume
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: visualY }} className="order-1 lg:order-2">
          <HeroVisual profile={profile} />
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollToSection('#about')}
        aria-label="Scroll to About section"
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-1.5 text-text-muted transition-colors hover:text-accent md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  )
}

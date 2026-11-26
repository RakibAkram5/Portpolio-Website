import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { BookOpen, Briefcase, Code2, GraduationCap, Rocket, School, Sparkles } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { timelineItems as fallbackTimeline } from '@/data/experience'
import { useApiData } from '@/hooks/useApiData'
import { useProfile } from '@/hooks/useProfile'
import { fetchTimeline } from '@/services/api'
import type { TimelineItem } from '@/types'

const EASE = [0.22, 1, 0.36, 1] as const

/** Leading 4-digit year of strings like "2023", "2023 – Present"; non-dated entries sort last. */
function yearOf(item: TimelineItem) {
  const m = /\d{4}/.exec(item.year)
  return m ? Number(m[0]) : Number.POSITIVE_INFINITY
}

function iconFor(item: TimelineItem) {
  const text = `${item.title} ${item.description}`.toLowerCase()
  if (/bs|bachelor|university|degree|bscs/.test(text)) return GraduationCap
  if (/school|matric/.test(text)) return School
  if (/fsc|intermediate|college|pre-engineering/.test(text)) return BookOpen
  if (/intern|job|work|freelanc|client|company/.test(text)) return Briefcase
  if (/launch|deploy|production|startup/.test(text)) return Rocket
  return Code2
}

export function Experience() {
  const { data: timeline } = useApiData(fetchTimeline, fallbackTimeline)
  const { data: profile } = useProfile()

  // Every entry belongs on the main path, oldest first; ties keep the admin "order".
  const items = [...timeline].sort((a, b) => yearOf(a) - yearOf(b) || a.order - b.order)

  const listRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })

  const firstYear = items.length ? items[0].year.match(/\d{4}/)?.[0] : undefined

  return (
    <section id="experience" className="relative overflow-hidden py-28 sm:py-36">
      {/* Section ambience */}
      <div className="pointer-events-none absolute left-1/2 top-40 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Journey"
          title="My Path So Far"
          description="A year-by-year look at how I've grown — from the classroom to building production-ready software."
          align="center"
          className="mx-auto"
        />

        {firstYear && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full border border-border-strong bg-surface/70 px-4 py-1.5 font-mono text-xs text-text-secondary"
          >
            <span className="text-accent">{firstYear}</span>
            <span className="h-px w-10 bg-gradient-to-r from-accent to-violet" />
            <span className="text-violet">Present</span>
          </motion.div>
        )}

        <div ref={listRef} className="relative mt-20">
          {/* Track + scroll-driven glowing fill */}
          <div className="absolute bottom-0 left-6 top-0 w-[2px] -translate-x-1/2 rounded-full bg-border-strong md:left-1/2" />
          <motion.div
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-6 top-0 w-[2px] origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-accent via-accent-soft to-violet shadow-[0_0_14px_var(--color-accent-glow)] md:left-1/2"
          />
          <TravellingGlow progress={progress} />

          <div className="flex flex-col gap-20 sm:gap-28">
            {items.map((item, i) => (
              <TimelineRow key={item.id} item={item} index={i} total={items.length} progress={progress} />
            ))}

            {/* Present day — derived from the profile, always the last stop */}
            <PresentRow role={profile.role} location={profile.location} />
          </div>
        </div>
      </div>
    </section>
  )
}

function TravellingGlow({ progress }: { progress: MotionValue<number> }) {
  const top = useTransform(progress, (v) => `${v * 100}%`)
  const opacity = useTransform(progress, [0, 0.02, 0.98, 1], [0, 1, 1, 0])
  return (
    <motion.div
      style={{ top, opacity }}
      className="pointer-events-none absolute left-6 z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-soft shadow-[0_0_24px_6px_var(--color-accent-glow)] md:left-1/2"
    />
  )
}

function TimelineRow({
  item,
  index,
  total,
  progress,
}: {
  item: TimelineItem
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const left = index % 2 === 0
  const Icon = iconFor(item)
  // The node lights up once the glowing line reaches it.
  const reachAt = total > 0 ? (index + 0.3) / (total + 1) : 0
  const lit = useTransform(progress, [reachAt - 0.04, reachAt], [0, 1])
  const nodeScale = useTransform(lit, [0, 1], [0.85, 1])

  return (
    <div className="relative grid grid-cols-[48px_1fr] items-start gap-4 md:grid-cols-[1fr_96px_1fr] md:gap-0">
      {/* Big ghost year on the opposite side (desktop) */}
      <motion.div
        initial={{ opacity: 0, x: left ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className={`hidden select-none items-center md:flex ${left ? 'order-3 justify-start pl-6' : 'order-1 justify-end pr-6'}`}
      >
        <span className="font-mono text-7xl font-bold tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)] lg:text-8xl">
          {item.year}
        </span>
      </motion.div>

      {/* Node */}
      <div className="relative z-10 flex justify-center md:order-2">
        <motion.div style={{ scale: nodeScale }} className="relative">
          <motion.span
            style={{ opacity: lit }}
            className="absolute -inset-3 rounded-full bg-accent/25 blur-md"
          />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-border-strong bg-surface shadow-lg shadow-black/40">
            <motion.div style={{ opacity: lit }} className="absolute inset-0 rounded-2xl border border-accent/70 bg-accent/10" />
            <Icon size={20} className="relative text-accent" />
          </div>
        </motion.div>
      </div>

      {/* Card */}
      <motion.article
        initial={{ opacity: 0, y: 40, x: left ? -30 : 30, rotate: left ? -1.5 : 1.5 }}
        whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: EASE }}
        whileHover={{ y: -6 }}
        className={`spotlight group relative overflow-hidden rounded-3xl border border-border bg-surface/80 p-6 shadow-xl shadow-black/20 backdrop-blur sm:p-7 ${
          left ? 'md:order-1 md:mr-6' : 'md:order-3 md:ml-6'
        }`}
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-60" />

        <div className="relative flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs font-semibold text-accent">
            {item.year}
          </span>
          <span className="font-mono text-[11px] text-text-muted">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        <h3 className="relative mt-4 text-lg font-semibold text-text-primary sm:text-xl">{item.title}</h3>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="relative mt-3 h-px w-16 origin-left bg-gradient-to-r from-accent to-transparent"
        />
        <p className="relative mt-3 text-sm leading-relaxed text-text-secondary sm:text-[15px]">{item.description}</p>
      </motion.article>
    </div>
  )
}

function PresentRow({ role, location }: { role: string; location: string }) {
  return (
    <div className="relative grid grid-cols-[48px_1fr] items-center gap-4 md:grid-cols-[1fr_96px_1fr] md:gap-0">
      <div className="hidden md:order-1 md:block" />
      <div className="relative z-10 flex justify-center md:order-2">
        <span className="absolute h-14 w-14 animate-ping rounded-full bg-violet/20" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-violet/60 bg-surface shadow-[0_0_30px_-4px_rgba(129,140,248,0.6)]">
          <Sparkles size={22} className="text-violet" />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: EASE }}
        className="md:order-3 md:ml-6"
      >
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-violet">Today</span>
        <h3 className="mt-2 text-xl font-semibold text-text-primary sm:text-2xl">
          {role} <span className="text-gradient">— and still building.</span>
        </h3>
        <p className="mt-2 text-sm text-text-secondary">Based in {location}. The next chapter is being written right now.</p>
      </motion.div>
    </div>
  )
}

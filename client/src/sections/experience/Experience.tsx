import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { experienceTimeline } from '@/data/experience'

export function Experience() {
  return (
    <section id="experience" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Journey"
          title="My Path So Far"
          description="A year-by-year look at how I've grown as a developer — from first lines of code to production-ready systems."
        />

        <div className="relative mt-16">
          <div className="absolute left-[19px] sm:left-1/2 top-0 bottom-0 w-px bg-border-strong sm:-translate-x-1/2" />

          <div className="flex flex-col gap-12">
            {experienceTimeline.map((item, i) => {
              const isEven = i % 2 === 0
              return (
                <div key={item.year} className="relative flex items-start sm:items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                    className={`hidden sm:flex sm:w-1/2 ${isEven ? 'justify-end pr-10' : 'order-2 justify-start pl-10'}`}
                  >
                    {isEven && <TimelineCard item={item} align="right" />}
                  </motion.div>

                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 20 }}
                    className="absolute left-0 sm:left-1/2 top-0 z-10 flex h-10 w-10 -translate-x-0 sm:-translate-x-1/2 items-center justify-center rounded-full border-2 border-accent bg-surface font-mono text-xs font-bold text-accent"
                  >
                    {item.year.slice(2)}
                  </motion.span>

                  <div className="pl-14 sm:hidden">
                    <TimelineCard item={item} align="left" />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                    className={`hidden sm:flex sm:w-1/2 ${!isEven ? 'justify-start pl-10' : 'order-2 justify-end pr-10'}`}
                  >
                    {!isEven && <TimelineCard item={item} align="left" />}
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineCard({ item, align }: { item: (typeof experienceTimeline)[number]; align: 'left' | 'right' }) {
  return (
    <div
      className={`max-w-sm rounded-2xl border border-border bg-surface/70 p-5 transition-colors hover:border-accent/30 ${
        align === 'right' ? 'text-right' : 'text-left'
      }`}
    >
      <span className="font-mono text-xs font-semibold text-accent">{item.year}</span>
      <h3 className="mt-1.5 text-base font-semibold text-text-primary">{item.title}</h3>
      <p className="mt-2 text-sm text-text-secondary leading-relaxed">{item.description}</p>
    </div>
  )
}

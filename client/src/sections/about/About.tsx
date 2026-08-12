import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { journeyTimeline } from '@/data/experience'
import { AboutStats } from './AboutStats'
import { DeveloperCard } from './DeveloperCard'
import { JourneyTimeline } from './JourneyTimeline'

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12 items-start">
          <div>
            <SectionHeading eyebrow="About Me" title="Behind the Code" />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-6 space-y-4 text-text-secondary leading-relaxed"
            >
              <p>
                I&apos;m a developer who enjoys turning ideas into real, working software. What started as curiosity
                about how applications are built has grown into a focused path through full-stack web development,
                Flutter mobile apps, and backend architecture.
              </p>
              <p>
                I care about the details that don&apos;t show up in a demo — clean data models, predictable APIs,
                sensible error handling, and code that&apos;s still easy to work with months later. My approach
                blends practical product thinking with an interest in how systems are structured underneath.
              </p>
            </motion.div>

            <AboutStats />
          </div>

          <div className="flex flex-col gap-10">
            <DeveloperCard />
            <JourneyTimeline items={journeyTimeline} />
          </div>
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { timelineItems as fallbackTimeline } from '@/data/experience'
import { useApiData } from '@/hooks/useApiData'
import { useProfile } from '@/hooks/useProfile'
import { fetchTimeline } from '@/services/api'
import { AboutStats } from './AboutStats'
import { DeveloperCard } from './DeveloperCard'
import { JourneyTimeline } from './JourneyTimeline'

export function About() {
  const { data: profile } = useProfile()
  const { data: timeline } = useApiData(fetchTimeline, fallbackTimeline)
  const journeyTimeline = timeline.filter((item) => item.track === 'JOURNEY').sort((a, b) => a.order - b.order)

  return (
    <section id="about" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12 items-start">
          <div>
            <SectionHeading eyebrow="About Me" title={profile.aboutHeading} />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-6 space-y-4 text-text-secondary leading-relaxed"
            >
              {profile.aboutParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </motion.div>

            <AboutStats stats={profile.stats} />
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

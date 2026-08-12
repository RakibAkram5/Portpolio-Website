import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { services as fallbackServices } from '@/data/services'
import { useApiData } from '@/hooks/useApiData'
import { fetchServices } from '@/services/api'
import { Icon } from '@/components/ui/Icon'

export function Services() {
  const { data: services } = useApiData(fetchServices, fallbackServices)

  return (
    <section id="services" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="What I Can Help You Build"
          description="From idea to production — full-stack builds, mobile apps, and the backend systems that hold them together."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border border-border bg-surface/70 p-6 transition-colors duration-300 hover:border-accent/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border-strong bg-surface-2 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:border-accent/50">
                <Icon name={service.icon} size={21} />
              </div>
              <h3 className="mt-5 text-base font-semibold text-text-primary">{service.title}</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

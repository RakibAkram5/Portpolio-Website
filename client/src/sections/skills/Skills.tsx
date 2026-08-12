import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { skills, skillCategories } from '@/data/skills'
import { cn } from '@/utils/cn'
import { SkillCard } from './SkillCard'

type Filter = 'All' | (typeof skillCategories)[number]

export function Skills() {
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = useMemo(
    () => (filter === 'All' ? skills : skills.filter((s) => s.category === filter)),
    [filter],
  )

  return (
    <section id="skills" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Skills & Technologies"
            title="Tools I Build With"
            description="A snapshot of the languages, frameworks, and tools I use to design, build, and ship applications end-to-end."
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-2"
          >
            {(['All', ...skillCategories] as Filter[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200 cursor-pointer',
                  filter === cat
                    ? 'border-accent/50 bg-accent/10 text-accent'
                    : 'border-border-strong text-text-secondary hover:text-text-primary hover:border-border-strong',
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

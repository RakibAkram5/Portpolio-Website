import { TechIcon } from '@/components/ui/TechIcon'
import { skills as fallbackSkills } from '@/data/skills'
import { useApiData } from '@/hooks/useApiData'
import { fetchSkills } from '@/services/api'

/** Infinite, hover-pausable strip of the technologies from the Skills list. */
export function TechMarquee() {
  const { data: skills } = useApiData(fetchSkills, fallbackSkills)
  if (skills.length === 0) return null
  const row = [...skills].sort((a, b) => a.order - b.order)

  return (
    <div className="relative border-y border-border bg-surface/40 py-5" aria-label="Technologies I work with">
      <div className="mask-fade-x group flex overflow-hidden">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused]"
          >
            {row.map((skill) => (
              <li key={`${copy}-${skill.id}`} className="flex items-center gap-2.5 whitespace-nowrap text-sm font-medium text-text-muted transition-colors hover:text-accent">
                <TechIcon name={skill.icon} size={18} />
                {skill.name}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

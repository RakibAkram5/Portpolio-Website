import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, GitBranch, Circle, MapPin } from 'lucide-react'
import { TechIcon } from '@/components/ui/TechIcon'
import { profilePhotoUrl } from '@/services/api'
import type { Profile } from '@/types'

const orbit = [
  { name: 'react', label: 'React', angle: -30 },
  { name: 'nodejs', label: 'Node.js', angle: 50 },
  { name: 'flutter', label: 'Flutter', angle: 140 },
  { name: 'postgresql', label: 'PostgreSQL', angle: 215 },
]

function initialsOf(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const pop = (delay: number) => ({
  initial: { opacity: 0, scale: 0.7, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 220, damping: 18, delay },
})

export function HeroVisual({ profile }: { profile: Profile }) {
  const photo = profilePhotoUrl(profile)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const showPhoto = photo && !failed

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[420px]">
      {/* Ambient glow */}
      <div className="absolute inset-[8%] rounded-full bg-accent/20 blur-[80px]" />

      {/* Orbit rings */}
      <motion.div
        className="absolute inset-0 rounded-full border border-dashed border-border-strong"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-[7%] rounded-full border border-border" />

      {/* Portrait with rotating gradient ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="absolute inset-[14%] rounded-full p-[3px] ring-spin shadow-[0_0_80px_-10px_var(--color-accent-glow)]"
      >
        <div className="relative h-full w-full overflow-hidden rounded-full bg-surface">
          {showPhoto ? (
            <>
              {!loaded && <div className="absolute inset-0 animate-pulse bg-surface-2" />}
              <motion.img
                src={photo}
                alt={profile.name}
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
                initial={{ scale: 1.15, opacity: 0 }}
                animate={loaded ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_25%,rgba(45,212,191,0.25),transparent_60%),radial-gradient(circle_at_75%_80%,rgba(129,140,248,0.2),transparent_60%)]">
              <span className="font-mono text-6xl font-bold tracking-tight text-gradient sm:text-7xl">{initialsOf(profile.name)}</span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.45)]" />
        </div>
      </motion.div>

      {/* Tech icons travelling on the orbit */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {orbit.map((item, i) => {
          const rad = (item.angle * Math.PI) / 180
          return (
            <div
              key={item.name}
              className="absolute"
              style={{ left: `${50 + 50 * Math.cos(rad)}%`, top: `${50 + 50 * Math.sin(rad)}%` }}
            >
              <motion.div
                {...pop(1 + i * 0.12)}
                className="-translate-x-1/2 -translate-y-1/2"
              >
                {/* Counter-rotate so icons stay upright while orbiting */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  title={item.label}
                  className="glass flex h-11 w-11 items-center justify-center rounded-full text-accent shadow-lg shadow-black/30 sm:h-12 sm:w-12"
                >
                  <TechIcon name={item.name} size={19} />
                </motion.div>
              </motion.div>
            </div>
          )
        })}
      </motion.div>

      {/* Floating info chips */}
      <motion.div {...pop(1.5)} className="absolute -left-2 top-[12%] sm:-left-8">
        <div className="glass flex items-center gap-2 rounded-xl px-3.5 py-2.5 shadow-xl animate-float-slow">
          <Database size={15} className="text-violet" />
          <span className="font-mono text-[11px] text-text-secondary">PostgreSQL</span>
        </div>
      </motion.div>

      <motion.div {...pop(1.65)} className="absolute -right-2 top-[42%] sm:-right-10">
        <div className="glass w-40 rounded-xl p-3 shadow-xl animate-float">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-accent">
            <Circle size={7} className="fill-accent text-accent" />
            200 OK · 38ms
          </div>
          <div className="mt-1.5 font-mono text-[10px] leading-relaxed text-text-muted">{'{ "status": "shipped" }'}</div>
        </div>
      </motion.div>

      <motion.div {...pop(1.8)} className="absolute bottom-[4%] left-[2%] sm:-left-4">
        <div className="glass flex items-center gap-2 rounded-xl px-3.5 py-2.5 shadow-xl animate-float">
          <GitBranch size={15} className="text-amber" />
          <span className="font-mono text-[11px] text-text-secondary">main ✓ build passing</span>
        </div>
      </motion.div>

      <motion.div {...pop(1.95)} className="absolute -bottom-2 right-[6%]">
        <div className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] text-text-secondary shadow-xl">
          <MapPin size={12} className="text-rose" />
          {profile.location}
        </div>
      </motion.div>
    </div>
  )
}

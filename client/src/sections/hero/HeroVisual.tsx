import { motion } from 'framer-motion'
import { Database, GitBranch, Circle } from 'lucide-react'
import { TechIcon } from '@/components/ui/TechIcon'

const codeLines = [
  { text: 'const app = express();', color: 'text-violet' },
  { text: "app.use('/api/v1', router);", color: 'text-text-secondary' },
  { text: '', color: '' },
  { text: 'async function getUser(req, res) {', color: 'text-accent-soft' },
  { text: '  const user = await prisma.user', color: 'text-text-secondary' },
  { text: '    .findUnique({ where });', color: 'text-text-secondary' },
  { text: '  return res.json(user);', color: 'text-text-secondary' },
  { text: '}', color: 'text-accent-soft' },
]

const badges = [
  { name: 'react', label: 'React' },
  { name: 'nodejs', label: 'Node.js' },
  { name: 'flutter', label: 'Flutter' },
  { name: 'postgresql', label: 'PostgreSQL' },
]

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
      {/* Terminal window */}
      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        className="relative rounded-2xl border border-border-strong bg-surface shadow-2xl shadow-black/40"
      >
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <span className="ml-3 font-mono text-xs text-text-muted">server.ts</span>
        </div>
        <div className="p-5 font-mono text-[13px] leading-6">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
              className={line.color || 'text-text-secondary'}
            >
              {line.text || ' '}
            </motion.div>
          ))}
          <motion.div
            className="mt-2 inline-block h-4 w-2 bg-accent"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.1 }}
          />
        </div>
      </motion.div>

      {/* API response card */}
      <motion.div
        initial={{ opacity: 0, y: 16, x: 10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute -right-4 sm:-right-10 top-1/3 w-44 rounded-xl border border-border-strong bg-surface-2/95 glass p-3 shadow-xl animate-float"
      >
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-accent">
          <Circle size={7} className="fill-accent text-accent" />
          200 OK
        </div>
        <div className="mt-1.5 font-mono text-[10px] text-text-muted leading-relaxed">
          {'{ "status": "success" }'}
        </div>
      </motion.div>

      {/* DB node card */}
      <motion.div
        initial={{ opacity: 0, y: -16, x: -10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.6, delay: 1.25 }}
        className="absolute -left-4 sm:-left-10 -top-6 flex items-center gap-2 rounded-xl border border-border-strong bg-surface-2/95 glass px-3.5 py-2.5 shadow-xl animate-float-slow"
      >
        <Database size={15} className="text-violet" />
        <span className="font-mono text-[11px] text-text-secondary">PostgreSQL</span>
      </motion.div>

      {/* Git card */}
      <motion.div
        initial={{ opacity: 0, y: 16, x: -10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute -bottom-6 left-4 flex items-center gap-2 rounded-xl border border-border-strong bg-surface-2/95 glass px-3.5 py-2.5 shadow-xl animate-float"
      >
        <GitBranch size={15} className="text-amber" />
        <span className="font-mono text-[11px] text-text-secondary">main ✓ build passing</span>
      </motion.div>

      {/* Floating tech badges */}
      <div className="absolute -bottom-10 right-0 flex gap-2 sm:-right-6">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.name}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.5 + i * 0.1 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-surface-2/95 glass text-accent shadow-lg animate-float"
            style={{ animationDelay: `${i * 0.4}s` }}
            title={badge.label}
          >
            <TechIcon name={badge.name} size={18} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

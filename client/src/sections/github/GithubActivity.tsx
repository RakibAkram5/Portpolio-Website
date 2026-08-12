import { motion } from 'framer-motion'
import { Star, Users, FolderGit2, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { skills } from '@/data/skills'
import { useProfile } from '@/hooks/useProfile'
import { useGithubProfile } from '@/hooks/useGithubProfile'
import { ActivityGraph } from './ActivityGraph'

const fallbackStats = [
  { label: 'Public Repositories', value: '10+', icon: FolderGit2 },
  { label: 'Technologies Used', value: `${skills.length}+`, icon: Star },
  { label: 'GitHub Followers', value: '—', icon: Users },
]

export function GithubActivity() {
  const { data: siteProfile } = useProfile()
  const { profile, repos, activity, status } = useGithubProfile(siteProfile.githubUsername)

  const stats =
    status === 'success' && profile
      ? [
          { label: 'Public Repositories', value: String(profile.publicRepos), icon: FolderGit2 },
          { label: 'Followers', value: String(profile.followers), icon: Users },
          { label: 'Following', value: String(profile.following), icon: Star },
        ]
      : fallbackStats

  return (
    <section id="github" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Development Activity"
            title="Open Source & Code"
            description="A live look at my public GitHub footprint — repositories, recent activity, and the projects I'm currently working on."
          />
          <a href={siteProfile.githubUrl} target="_blank" rel="noreferrer" className="shrink-0">
            <Button variant="secondary" icon={<GithubIcon size={16} />} iconPosition="left">
              @{siteProfile.githubUsername}
            </Button>
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-4 lg:col-span-1"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface/70 px-5 py-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-strong bg-surface-2 text-accent">
                  <stat.icon size={17} />
                </span>
                <div>
                  <div className="font-mono text-lg font-bold text-text-primary">{stat.value}</div>
                  <div className="text-xs text-text-secondary">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-border bg-surface/70 p-6 lg:col-span-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text-primary">Last 28 Days</h3>
              <span className="font-mono text-xs text-text-muted">
                {status === 'success' ? 'live from GitHub' : 'unavailable'}
              </span>
            </div>
            <div className="mt-5">
              {status === 'success' ? (
                <ActivityGraph activity={activity} />
              ) : (
                <p className="text-sm text-text-secondary">
                  Activity data couldn&apos;t be loaded right now — check back later or view the profile directly on
                  GitHub.
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {status === 'success' && repos.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.slice(0, 6).map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.htmlUrl}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group rounded-2xl border border-border bg-surface/70 p-5 transition-colors hover:border-accent/40"
              >
                <div className="flex items-center justify-between">
                  <span className="truncate font-mono text-sm font-semibold text-text-primary">{repo.name}</span>
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-accent opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                  />
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-text-secondary">
                  {repo.description ?? 'No description provided.'}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-text-muted">
                  {repo.language && <span>{repo.language}</span>}
                  <span className="inline-flex items-center gap-1">
                    <Star size={12} />
                    {repo.stars}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

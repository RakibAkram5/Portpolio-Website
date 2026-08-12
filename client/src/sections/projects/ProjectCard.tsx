import { motion } from 'framer-motion'
import { ExternalLink, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { Badge } from '@/components/ui/Badge'
import type { Project } from '@/types'
import { ProjectMockup } from './ProjectMockup'

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: (project: Project) => void
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative rounded-3xl border border-border bg-surface/70 p-5 sm:p-6 transition-colors duration-300 hover:border-accent/40"
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="block w-full text-left cursor-pointer"
        aria-label={`View details for ${project.title}`}
      >
        <ProjectMockup project={project} className="transition-transform duration-500 group-hover:scale-[1.01]" />

        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-text-primary flex items-center gap-1.5">
              {project.title}
              <ArrowUpRight
                size={17}
                className="text-accent opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
              />
            </h3>
            <p className="mt-1.5 text-sm text-text-secondary">{project.tagline}</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-text-secondary leading-relaxed line-clamp-3">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </button>

      <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-accent transition-colors"
        >
          <GithubIcon size={15} />
          Code
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-accent transition-colors"
          >
            <ExternalLink size={15} />
            Live Demo
          </a>
        )}
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="ml-auto text-sm font-medium text-accent hover:text-accent-soft transition-colors cursor-pointer"
        >
          Details
        </button>
      </div>
    </motion.article>
  )
}

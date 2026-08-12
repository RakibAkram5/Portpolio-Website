import { ExternalLink, Layers, ListChecks, Boxes } from 'lucide-react'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Project } from '@/types'
import { ProjectMockup } from './ProjectMockup'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <Modal isOpen={!!project} onClose={onClose} labelledBy="project-modal-title">
      {project && (
        <div className="p-6 sm:p-8">
          <ProjectMockup project={project} className="h-56 sm:h-72" />

          <div className="mt-7">
            <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-bold text-text-primary">
              {project.title}
            </h2>
            <p className="mt-1.5 text-text-secondary">{project.tagline}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                <Boxes size={16} className="text-accent" />
                Overview
              </h3>
              <p className="mt-2.5 text-sm text-text-secondary leading-relaxed">{project.description}</p>
            </section>

            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                <Layers size={16} className="text-accent" />
                Architecture
              </h3>
              <p className="mt-2.5 text-sm text-text-secondary leading-relaxed">{project.architecture}</p>
            </section>
          </div>

          <section className="mt-8">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-text-primary">
              <ListChecks size={16} className="text-accent" />
              Key Features
            </h3>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-text-secondary">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h3 className="text-sm font-semibold text-text-primary">Problem Solved</h3>
            <p className="mt-2.5 text-sm text-text-secondary leading-relaxed">{project.problem}</p>
          </section>

          <div className="mt-9 flex flex-wrap gap-3 border-t border-border pt-6">
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              <Button variant="secondary" icon={<GithubIcon size={16} />} iconPosition="left">
                View Code
              </Button>
            </a>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                <Button icon={<ExternalLink size={16} />}>Live Demo</Button>
              </a>
            )}
          </div>
        </div>
      )}
    </Modal>
  )
}

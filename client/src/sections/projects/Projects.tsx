import { useState } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { projects as fallbackProjects } from '@/data/projects'
import { useApiData } from '@/hooks/useApiData'
import { fetchProjects } from '@/services/api'
import type { Project } from '@/types'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const { data: projects } = useApiData(fetchProjects, fallbackProjects)

  return (
    <section id="projects" className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured Work"
          title="Things I've Built"
          description="A selection of real projects spanning mobile apps, ERP systems, and backend APIs — built end-to-end, from data model to UI."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {projects.map((project, i) => (
            <div key={project.id} className={project.featured ? '' : 'lg:col-span-2'}>
              <ProjectCard project={project} index={i} onOpen={setActiveProject} />
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}

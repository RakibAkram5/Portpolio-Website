import type { Request, Response } from 'express'
import { ApiError } from '../utils/ApiError'
import { getProjectBySlug, listProjects } from '../services/project.service'

export async function getProjects(_req: Request, res: Response) {
  const projects = await listProjects()
  res.status(200).json({ success: true, data: projects })
}

export async function getProject(req: Request<{ slug: string }>, res: Response) {
  const project = await getProjectBySlug(req.params.slug)

  if (!project) {
    throw new ApiError(404, `Project not found: ${req.params.slug}`)
  }

  res.status(200).json({ success: true, data: project })
}

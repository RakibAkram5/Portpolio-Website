import type { Request, Response } from 'express'
import { ApiError } from '../utils/ApiError'
import { projectSchema, projectUpdateSchema } from '../validators/project.validator'
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjectBySlug,
  listProjects,
  updateProject,
} from '../services/project.service'

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

export async function postProject(req: Request, res: Response) {
  const input = projectSchema.parse(req.body)
  const project = await createProject(input)
  res.status(201).json({ success: true, data: project })
}

export async function putProject(req: Request<{ id: string }>, res: Response) {
  const existing = await getProjectById(req.params.id)
  if (!existing) throw new ApiError(404, 'Project not found.')

  const input = projectUpdateSchema.parse(req.body)
  const project = await updateProject(req.params.id, input)
  res.status(200).json({ success: true, data: project })
}

export async function removeProject(req: Request<{ id: string }>, res: Response) {
  const existing = await getProjectById(req.params.id)
  if (!existing) throw new ApiError(404, 'Project not found.')

  await deleteProject(req.params.id)
  res.status(200).json({ success: true, message: 'Project deleted.' })
}

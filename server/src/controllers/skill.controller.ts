import type { Request, Response } from 'express'
import { ApiError } from '../utils/ApiError'
import { skillSchema, skillUpdateSchema } from '../validators/skill.validator'
import { createSkill, deleteSkill, getSkillById, listSkills, updateSkill } from '../services/skill.service'

export async function getSkills(_req: Request, res: Response) {
  const skills = await listSkills()
  res.status(200).json({ success: true, data: skills })
}

export async function postSkill(req: Request, res: Response) {
  const input = skillSchema.parse(req.body)
  const skill = await createSkill(input)
  res.status(201).json({ success: true, data: skill })
}

export async function putSkill(req: Request<{ id: string }>, res: Response) {
  const existing = await getSkillById(req.params.id)
  if (!existing) throw new ApiError(404, 'Skill not found.')

  const input = skillUpdateSchema.parse(req.body)
  const skill = await updateSkill(req.params.id, input)
  res.status(200).json({ success: true, data: skill })
}

export async function removeSkill(req: Request<{ id: string }>, res: Response) {
  const existing = await getSkillById(req.params.id)
  if (!existing) throw new ApiError(404, 'Skill not found.')

  await deleteSkill(req.params.id)
  res.status(200).json({ success: true, message: 'Skill deleted.' })
}

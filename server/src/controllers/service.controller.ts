import type { Request, Response } from 'express'
import { ApiError } from '../utils/ApiError'
import { serviceSchema, serviceUpdateSchema } from '../validators/service.validator'
import { createService, deleteService, getServiceById, listServices, updateService } from '../services/service.service'

export async function getServices(_req: Request, res: Response) {
  const services = await listServices()
  res.status(200).json({ success: true, data: services })
}

export async function postService(req: Request, res: Response) {
  const input = serviceSchema.parse(req.body)
  const service = await createService(input)
  res.status(201).json({ success: true, data: service })
}

export async function putService(req: Request<{ id: string }>, res: Response) {
  const existing = await getServiceById(req.params.id)
  if (!existing) throw new ApiError(404, 'Service not found.')

  const input = serviceUpdateSchema.parse(req.body)
  const service = await updateService(req.params.id, input)
  res.status(200).json({ success: true, data: service })
}

export async function removeService(req: Request<{ id: string }>, res: Response) {
  const existing = await getServiceById(req.params.id)
  if (!existing) throw new ApiError(404, 'Service not found.')

  await deleteService(req.params.id)
  res.status(200).json({ success: true, message: 'Service deleted.' })
}

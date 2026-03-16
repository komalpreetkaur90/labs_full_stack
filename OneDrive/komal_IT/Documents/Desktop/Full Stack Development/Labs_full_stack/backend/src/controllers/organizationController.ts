import { Request, Response } from "express"
import { organizationService } from "../services/organizationService"

export const getLeaders = (req: Request, res: Response) => {
  const leaders = organizationService.getLeaders()
  res.json(leaders)
}

export const createLeader = (req: Request, res: Response) => {

  const { firstName, lastName, role } = req.body

  if (!firstName || !lastName || !role) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const leader = organizationService.createLeader({
    firstName,
    lastName,
    role
  })

  res.status(201).json(leader)
}
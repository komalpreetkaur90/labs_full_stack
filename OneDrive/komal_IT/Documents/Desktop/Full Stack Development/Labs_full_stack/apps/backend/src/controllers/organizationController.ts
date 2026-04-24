import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { organizationService } from "../services/organizationService";

export const getOrganizations = (req: Request, res: Response) => {
  const page = Number.parseInt(String(req.query.page ?? "1"), 10);
  const pageSize = Number.parseInt(String(req.query.pageSize ?? "8"), 10);
  res.json(organizationService.getOrganizationsPage(page, pageSize));
};

export const createOrganization = (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized - please log in" });
  }

  const { firstName, lastName, role } = req.body;

  if (!firstName || !lastName || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const roleExists = organizationService
    .getOrganizations()
    .some((organization) => organization.role.toLowerCase() === String(role).toLowerCase());

  if (roleExists) {
    return res.status(409).json({ error: "This role is already occupied." });
  }

  const organization = organizationService.createOrganization({
    firstName,
    lastName,
    role
  });

  res.status(201).json({
    ...organization,
    createdBy: userId
  });
};

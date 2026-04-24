import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { createOrganization, getOrganizations } from "../controllers/organizationController";

const router = Router();

router.get("/", getOrganizations);
router.post("/", requireAuth(), createOrganization);

export default router;

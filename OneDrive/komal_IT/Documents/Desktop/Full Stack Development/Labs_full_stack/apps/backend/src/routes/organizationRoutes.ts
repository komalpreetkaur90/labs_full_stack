import { Router } from "express";
import { createOrganization, getOrganizations } from "../controllers/organizationController";

const router = Router();

router.get("/", getOrganizations);
router.post("/", createOrganization);

export default router;

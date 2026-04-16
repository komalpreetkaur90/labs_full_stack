import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { getEmployees, createEmployee } from "../controllers/employeeController";

const router = Router();

router.get("/", getEmployees);
router.post("/", requireAuth(), createEmployee);

export default router;

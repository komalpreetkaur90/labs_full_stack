import { Router } from "express"
import { getLeaders, createLeader } from "../controllers/organizationController"

const router = Router()

router.get("/leaders", getLeaders)
router.post("/leaders", createLeader)

export default router
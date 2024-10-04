import { Router } from "express"
import { verifyUserOrAdmin } from "../controllers/authController"

const router = Router()

router.post("/verify", verifyUserOrAdmin)

export default router

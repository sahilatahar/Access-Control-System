import { Router } from "express"
import { verifyUserOrAdmin, logout } from "../controllers/authController"

const router = Router()

router.get("/verify", verifyUserOrAdmin).post("/logout", logout)

export default router

import { Router } from "express"
import { verifyUserOrAdmin, logout } from "../controllers/authController.js"

const router = Router()

router.get("/verify", verifyUserOrAdmin).post("/logout", logout)

export default router

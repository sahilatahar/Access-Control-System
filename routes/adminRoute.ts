import { Router } from "express"
import { adminAuthorization } from "middlewares/auth.middleware"
import {
	deleteAdmin,
	getAdmin,
	loginAdmin,
	logoutAdmin,
	registerAdmin,
	updateAdmin,
} from "../controllers/adminController"

const router = Router()

router
	.post("/register", registerAdmin)
	.post("/login", loginAdmin)
	.post("/logout", logoutAdmin)
	.get("/:id", adminAuthorization, getAdmin)
	.put("/:id", adminAuthorization, updateAdmin)
	.delete("/:id", adminAuthorization, deleteAdmin)

export default router

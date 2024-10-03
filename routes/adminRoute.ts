import { Router } from "express"
import { adminAuthorization } from "middlewares/auth.middleware"
import {
	deleteAdmin,
	getAdmin,
	loginAdmin,
	registerAdmin,
	updateAdmin,
} from "../controllers/adminController"

const router = Router()

router
	.post("/register", registerAdmin)
	.post("/login", loginAdmin)
	.get("/:id", adminAuthorization, getAdmin)
	.put("/:id", adminAuthorization, updateAdmin)
	.delete("/:id", adminAuthorization, deleteAdmin)

export default router

import { Router } from "express"
import { adminAuthorization } from "middlewares/auth.middleware"
import {
	deleteAdmin,
	getAdmin,
	loginAdmin,
	registerAdmin,
	updateAdmin,
} from "../controllers/adminController"
import { getUsers } from "../controllers/userController"

const router = Router()

router
	.post("/", registerAdmin)
	.post("/login", loginAdmin)
	.get("/all-users", adminAuthorization, getUsers)
	.get("/:id", adminAuthorization, getAdmin)
	.put("/:id", adminAuthorization, updateAdmin)
	.delete("/:id", adminAuthorization, deleteAdmin)

export default router

import { Router } from "express"
import { adminAuthorization } from "../middlewares/auth.middleware.js"
import {
	deleteAdmin,
	getAdmin,
	loginAdmin,
	registerAdmin,
	updateAdmin,
} from "../controllers/adminController.js"
import { getUsers } from "../controllers/userController.js"

const router = Router()

router
	.post("/", registerAdmin)
	.post("/login", loginAdmin)
	.get("/all-users", adminAuthorization, getUsers)
	.get("/:id", adminAuthorization, getAdmin)
	.put("/:id", adminAuthorization, updateAdmin)
	.delete("/:id", adminAuthorization, deleteAdmin)

export default router

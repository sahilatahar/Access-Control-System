import { Router } from "express"
import {
	deleteUser,
	getUser,
	login,
	register,
	updateUser,
} from "../controllers/userController"
import {
	adminAuthorization,
	userOrAdminAuthorization,
} from "../middlewares/auth.middleware"

const router = Router()

router
	.post("/", register)
	.post("/login", login)
	.get("/:id", userOrAdminAuthorization, getUser)
	.put("/:id", userOrAdminAuthorization, updateUser)
	.delete("/:id", adminAuthorization, deleteUser)

export default router

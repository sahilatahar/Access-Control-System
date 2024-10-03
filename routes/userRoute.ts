import { Router } from "express"
import {
	deleteUser,
	getUser,
	login,
	register,
	updateUser,
} from "../controllers/userController.ts"
import {
	adminAuthorization,
	userAuthorization,
} from "../middlewares/auth.middleware.ts"

const router = Router()

router
	.post("/register", register)
	.post("/login", login)
	.get("/:id", userAuthorization, getUser)
	.put("/:id", userAuthorization, updateUser)
	.delete("/:id", adminAuthorization, deleteUser)

export default router

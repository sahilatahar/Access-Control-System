import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import Admin, { IAdmin } from "../models/Admin.js"
import User, { IUser } from "../models/User.js"

// Middleware to verify admin permissions for user and admin modifications
export const adminAuthorization = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies?.token

	if (!token) {
		return res
			.status(403)
			.json({ message: "Access denied. No token provided." })
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
			id: string
			email: string
			role: string
		}

		const admin: IAdmin | null = await Admin.findById(decoded.id)
		if (!admin) {
			return res.status(404).json({ message: "Admin not found." })
		}

		// Checking if the request is trying to modify another admin's data
		const isModifyingOwnData = req.params.adminId === decoded.id

		if (!isModifyingOwnData) {
			const isUserRequest = req.baseUrl.includes("/users")
			const isAdminRequest = req.baseUrl.includes("/admins")

			// Allow if it's a user request
			if (isUserRequest) {
				return next()
			}
			// Deny if it's an admin request
			if (isAdminRequest) {
				return res
					.status(403)
					.json({ message: "Admins cannot modify other admin accounts." })
			}
		}

		// Proceed with the request
		next()
	} catch (error) {
		return res.status(401).json({ message: "Invalid token." })
	}
}

// Middleware to verify user permissions for accessing and modifying user data
export const userOrAdminAuthorization = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies?.token
	if (!token) {
		return res
			.status(403)
			.json({ message: "Access denied. No token provided." })
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
			id: string
			email: string
			role: string
		}

		if (decoded.role === "admin") {
			next()
			return // <---- Removing this cause error
		}

		// Fetch the user from the database
		const user: IUser | null = await User.findById(decoded.id)

		if (!user) {
			return res.status(404).json({ message: "User not found." })
		}

		// Check if the request is trying to modify or access another user's data
		const isModifyingOwnData = req.params.id === decoded.id

		if (!isModifyingOwnData) {
			return res
				.status(403)
				.json({ message: "Access denied. You can only modify your own data." })
		}

		next()
	} catch (error) {
		return res.status(401).json({ message: "Invalid token." })
	}
}

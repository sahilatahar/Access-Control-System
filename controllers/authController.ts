import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import Admin, { IAdmin } from "../models/Admin"
import User, { IUser } from "../models/User"

// Verify the logged-in user or admin and return their data and role
export const verifyUserOrAdmin = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const token = req.cookies?.token

		if (!token) {
			return res
				.status(401)
				.json({ message: "No token provided, please log in." })
		}

		// Verify token and extract user data
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
			id: string
			role: string
		}

		// Fetch the user or admin from the database based on their role
		if (decoded.role === "admin") {
			const admin: IAdmin | null = await Admin.findById(decoded.id)
			if (!admin) {
				return res.status(404).json({ message: "Admin not found." })
			}
			return res.status(200).json({
				message: "Token verified successfully",
				admin,
				role: "admin",
			})
		} else if (decoded.role === "user") {
			const user: IUser | null = await User.findById(decoded.id)
			if (!user) {
				return res.status(404).json({ message: "User not found." })
			}
			return res.status(200).json({
				message: "Token verified successfully",
				user,
				role: "user",
			})
		} else {
			return res.status(403).json({ message: "Invalid role." })
		}
	} catch (error) {
		return res.status(401).json({ message: "Invalid token." })
	}
}

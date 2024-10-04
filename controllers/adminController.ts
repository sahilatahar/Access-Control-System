import { Request, Response } from "express"
import { ZodError } from "zod"
import * as adminService from "../services/adminService"
import { adminLoginSchema, adminSchema } from "../validations/adminValidation"

// Register a new admin
export const registerAdmin = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		// Validating request body
		adminSchema.parse(req.body)

		const admin = await adminService.createAdmin(req.body)

		const token = adminService.generateToken(admin)

		// Saving the token in a cookie
		res.cookie("token", token, { httpOnly: true, secure: true })

		return res
			.status(201)
			.json({ message: "Admin registered successfully", admin })
	} catch (err) {
		if (err instanceof ZodError) {
			return res.status(400).json({ errors: err.errors })
		}
		return res.status(500).json({ message: "Internal Server Error" })
	}
}

// Login an admin
export const loginAdmin = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		// Validating request body
		adminLoginSchema.parse(req.body)

		const { email, password } = req.body
		const admin = await adminService.getAdminByEmail(email)

		if (!admin) {
			return res.status(400).json({ message: "Admin not found" })
		} else if (!(await adminService.checkPassword(password, admin.password))) {
			return res.status(400).json({ message: "Incorrect Password" })
		}

		// Updating lastLogin before sending the token
		await adminService.updateLastLogin(admin._id)

		const token = adminService.generateToken(admin)

		// Saving the token in a cookie
		res.cookie("token", token, { httpOnly: true, secure: true })

		return res.status(200).json({ message: "Login successful", admin })
	} catch (err) {
		if (err instanceof ZodError) {
			return res.status(400).json({ errors: err.errors })
		}
		return res.status(500).json({ message: "Internal Server Error" })
	}
}

// Get Admin by Email
export const getAdmin = async (req: Request, res: Response) => {
	const { id } = req.params
	const admin = await adminService.getAdminById(id)
	if (admin) {
		return res.status(200).json(admin)
	} else {
		return res.status(404).json({ message: "Admin not found" })
	}
}

// Update Admin
export const updateAdmin = async (req: Request, res: Response) => {
	const adminId = req.params.id
	const adminData = req.body

	const updatedAdmin = await adminService.updateAdmin(adminId, adminData)
	if (updatedAdmin) {
		return res.status(200).json(updatedAdmin)
	} else {
		return res.status(404).json({ message: "Admin not found" })
	}
}

// Delete Admin
export const deleteAdmin = async (req: Request, res: Response) => {
	const adminId = req.params.id

	const deletedAdmin = await adminService.deleteAdmin(adminId)
	if (deletedAdmin) {
		return res.status(200).json({ message: "Admin deleted" })
	} else {
		return res.status(404).json({ message: "Admin not found" })
	}
}

export const logoutAdmin = (req: Request, res: Response): Response => {
	// Clear the authentication token cookie
	res.clearCookie("token", { httpOnly: true, secure: true })

	return res.status(200).json({ message: "Admin logged out successfully." })
}

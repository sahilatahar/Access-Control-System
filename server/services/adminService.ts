import Admin, { IAdmin } from "../models/Admin.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Generate JWT token
export const generateToken = (admin: IAdmin) => {
	return jwt.sign(
		{ id: admin._id, email: admin.email, role: "admin" },
		process.env.JWT_SECRET!,
		{ expiresIn: "1h" }
	)
}

// Create Admin
export const createAdmin = async (adminData: IAdmin): Promise<IAdmin> => {
	const hashedPassword = await bcrypt.hash(adminData.password, 12)
	adminData.password = hashedPassword

	const newAdmin = new Admin(adminData)
	return await newAdmin.save()
}

// Get Admin by Email
export const getAdminByEmail = async (
	email: string
): Promise<IAdmin | null> => {
	return await Admin.findOne({ email })
}

// Check Password
export const checkPassword = async (
	inputPassword: string,
	storedPassword: string
): Promise<boolean> => {
	return await bcrypt.compare(inputPassword, storedPassword)
}

// Update Last Login
export const updateLastLogin = async (
	adminId: string
): Promise<IAdmin | null> => {
	return await Admin.findByIdAndUpdate(
		adminId,
		{ lastLogin: new Date() },
		{ new: true }
	).select("-select")
}

// Get Admin by ID
export const getAdminById = async (adminId: string): Promise<IAdmin | null> => {
	return await Admin.findById(adminId).select("-password")
}

// Update Admin Details
export const updateAdmin = async (
	adminId: string,
	adminData: Partial<IAdmin>
): Promise<IAdmin | null> => {
	return await Admin.findByIdAndUpdate(adminId, adminData, {
		new: true,
	}).select("-password")
}

// Delete Admin
export const deleteAdmin = async (adminId: string): Promise<IAdmin | null> => {
	return await Admin.findByIdAndDelete(adminId)
}

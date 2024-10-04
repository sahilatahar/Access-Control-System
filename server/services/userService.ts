import User, { IUser } from "../models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const createUser = async (data: IUser): Promise<IUser> => {
	const hashedPassword = await bcrypt.hash(data.password, 12)
	const newUser = new User({ ...data, password: hashedPassword })
	return await newUser.save()
}

export const updateUser = async (
	id: string,
	data: Partial<IUser>
): Promise<IUser | null> => {
	const user = await User.findByIdAndUpdate(id, data, { new: true }).select(
		"-password"
	)
	return user
}

export const deleteUser = async (id: string): Promise<{ message: string }> => {
	await User.findByIdAndDelete(id)
	return { message: "User deleted successfully" }
}

export const getUser = async (id: string): Promise<IUser | null> => {
	return await User.findById(id).select("-password")
}

export const getUsers = async (): Promise<IUser[]> => {
	return await User.find().select("-password")
}

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
	return await User.findOne({ email })
}

export const checkPassword = async (
	inputPassword: string,
	userPassword: string
): Promise<boolean> => {
	return await bcrypt.compare(inputPassword, userPassword)
}

export const generateToken = (user: IUser): string => {
	return jwt.sign(
		{ id: user._id, email: user.email, role: "user" },
		process.env.JWT_SECRET!,
		{
			expiresIn: "1d",
		}
	)
}

export const updateLastLogin = async (userId: string): Promise<void> => {
	await User.findByIdAndUpdate(userId, { lastLogin: new Date() }).select(
		"-password"
	)
}

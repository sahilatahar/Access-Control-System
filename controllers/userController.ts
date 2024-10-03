import { Request, Response } from "express"
import { ZodError } from "zod"
import * as userService from "../services/userService"
import { loginSchema, userSchema } from "../validations/userValidation"

// Register a new user
export const register = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		// Validating request body
		userSchema.parse(req.body)

		const newUser = await userService.createUser(req.body)

		const token = userService.generateToken(newUser)

		// Saving the token in a cookie
		res.cookie("token", token, { httpOnly: true, secure: true })

		return res
			.status(201)
			.json({ message: "User registered successfully", user: newUser })
	} catch (err) {
		if (err instanceof ZodError) {
			return res.status(400).json({ errors: err.errors })
		}
		return res.status(500).json({ message: "Internal Server Error" })
	}
}

// Login a user
export const login = async (req: Request, res: Response): Promise<Response> => {
	try {
		// Validating request body
		loginSchema.parse(req.body)

		const { email, password } = req.body
		const user = await userService.findUserByEmail(email)

		if (!user) {
			return res.status(400).json({ message: "User not found" })
		} else if (!(await userService.checkPassword(password, user.password))) {
			return res.status(400).json({ message: "Incorrect Password" })
		}
		// Updating lastLogin before sending the token
		await userService.updateLastLogin(user._id)

		const token = userService.generateToken(user)

		res.cookie("token", token, { httpOnly: true, secure: true })

		return res.status(200).json({ message: "Login successful", user })
	} catch (err) {
		if (err instanceof ZodError) {
			return res.status(400).json({ errors: err.errors })
		}
		return res.status(500).json({ message: "Internal Server Error" })
	}
}

// Get a user by ID
export const getUser = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const user = await userService.getUser(req.params.id)

		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}

		return res.status(200).json(user)
	} catch (err) {
		return res.status(500).json({ message: "Internal Server Error" })
	}
}

// Update a user
export const updateUser = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const updatedUser = await userService.updateUser(req.params.id, req.body)

		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" })
		}

		return res.status(200).json(updatedUser)
	} catch (err) {
		return res.status(500).json({ message: "Internal Server Error" })
	}
}

// Delete a user
export const deleteUser = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const deletedUser = await userService.deleteUser(req.params.id)
		return res.status(200).json(deletedUser)
	} catch (err) {
		return res.status(500).json({ message: "Internal Server Error" })
	}
}

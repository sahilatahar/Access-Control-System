import { z } from "zod"

export const userSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email format").min(1, "Email is required"),
	dob: z.date().refine((date) => !isNaN(date.getTime()), {
		message: "Invalid date",
	}),
	password: z.string().min(6, "Password must be at least 6 characters long"),
	profileImage: z.string().optional(),
})

export const loginSchema = z.object({
	email: z.string().email("Invalid email format").min(1, "Email is required"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
})

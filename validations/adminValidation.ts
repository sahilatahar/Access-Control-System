import { z } from "zod"

export const adminSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email format").min(1, "Email is required"),
	dob: z.date().refine((date) => !isNaN(date.getTime()), {
		message: "Invalid date",
	}),
	password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const adminLoginSchema = z.object({
	email: z.string().email("Invalid email format").min(1, "Email is required"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
})

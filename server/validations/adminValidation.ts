import { z } from "zod"

export const adminSchema = z.object({
	name: z.string().min(1, "Name is required"),
	age: z.string().min(1, "Age is required"),
	address: z.string().min(1, "Address is required"),
	email: z.string().email("Invalid email format").min(1, "Email is required"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const adminLoginSchema = z.object({
	email: z.string().email("Invalid email format").min(1, "Email is required"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
})

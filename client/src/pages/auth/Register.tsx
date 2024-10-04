import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import useAuth from "../../hooks/useAuth"

const registerSchema = z
	.object({
		name: z.string().min(1, "Name is required"),
		email: z.string().email("Invalid email address"),
		age: z.number().min(18, "You must be at least 18 years old"),
		address: z.string().min(1, "Address is required"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	})

function RegisterPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		age: "",
		address: "",
		password: "",
		confirmPassword: "",
	})
	const [error, setError] = useState<string | null>(null)
	const navigate = useNavigate()
	const { register } = useAuth()

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		// Convert age to a number for validation
		const formDataWithAge = {
			...formData,
			age: Number(formData.age),
		}

		// Validate form data
		const validationResult = registerSchema.safeParse(formDataWithAge)

		if (!validationResult.success) {
			setError(validationResult.error.errors[0].message)
			return
		}

		setError(null)

		const response = await register(formData, "user")

		if (typeof response === "boolean" && response) {
			navigate("/user")
		} else if (typeof response === "object" && response.message) {
			setError(response.message)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<div className="min-h-screen flex justify-center py-8">
			<main>
				<form
					className="w-[90vw] md:w-[600px] md:shadow-box rounded-lg p-2 md:p-8 flex flex-col gap-4 text-base"
					onSubmit={handleSubmit}
				>
					<h1 className="text-3xl font-medium text-center py-4">
						Create an account
					</h1>
					<div className="input-group">
						<div className="form-control">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
							/>
						</div>
						<div className="form-control">
							<label htmlFor="age">Age</label>
							<input
								type="number"
								id="age"
								name="age"
								value={formData.age}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="input-group">
						<div className="form-control">
							<label htmlFor="address">Address</label>
							<input
								type="text"
								id="address"
								name="address"
								value={formData.address}
								onChange={handleChange}
							/>
						</div>
						<div className="form-control">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="input-group">
						<div className="form-control">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								id="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
							/>
						</div>
						<div className="form-control">
							<label htmlFor="confirmPassword">Confirm Password</label>
							<input
								type="password"
								id="confirmPassword"
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleChange}
							/>
						</div>
					</div>
					{error && (
						<p className="text-red-500 w-full text-base font-medium">{error}</p>
					)}
					<button type="submit" className="btn">
						Create Account
					</button>
					<p className="pt-8 text-center text-base font-medium text-text-secondary">
						Already have an account?{" "}
						<Link to="/login" className="text-green-500 hover:underline">
							Log in
						</Link>
					</p>
				</form>
			</main>
		</div>
	)
}

export default RegisterPage

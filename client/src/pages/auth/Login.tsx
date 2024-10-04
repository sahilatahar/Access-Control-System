import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import useAuth from "../../hooks/useAuth"

const loginSchema = z.object({
	email: z.string().email("Invalid email format"),
	password: z.string().min(6, "Password must be at least 6 characters"),
})

function LoginPage() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})
	const [error, setError] = useState<string | null>(null)
	const navigate = useNavigate()
	const { login } = useAuth()

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		// Validate form Data
		const validationResult = loginSchema.safeParse(formData)

		if (!validationResult.success) {
			setError(validationResult.error.errors[0].message)
			return
		}

		setError(null)

		const response = await login(formData, "user")

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
		<div className="min-h-screen flex justify-center items-center py-8 bg-green-100">
			<main>
				<form
					className="w-[95vw] sm:w-[500px] md:shadow-box rounded-lg p-2 md:p-8 flex flex-col gap-4 text-base bg-white"
					onSubmit={handleSubmit}
				>
					<h1 className="text-3xl font-medium text-center py-4">
						Login to your account
					</h1>
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
					{error && (
						<p className="text-red-500 w-full text-base font-medium">{error}</p>
					)}
					<button type="submit" className="btn">
						Login
					</button>
					<p className="pt-4 text-center text-base font-medium text-text-secondary">
						Don&apos;t have an account?{" "}
						<Link to="/register" className="text-green-500 hover:underline">
							Create Account
						</Link>
					</p>
				</form>
			</main>
		</div>
	)
}

export default LoginPage

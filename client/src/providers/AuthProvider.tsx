import { AxiosError } from "axios"
import { createContext, ReactNode, useEffect, useState } from "react"
import { Admin, LoginCredentials, User } from "../types/user"
import axios from "../api/axios"

interface AuthContent {
	isAuthenticated: boolean
	user: User | null
	loading: boolean
	role: "admin" | "user" | null
	verify: (type: "user" | "admin") => void
	register: (
		formData: User | Admin,
		type: "user" | "admin"
	) => Promise<{ message: string } | boolean>
	login: (
		formData: LoginCredentials,
		type: "user" | "admin"
	) => Promise<{ message: string } | boolean>
	logout: () => Promise<{ message: string } | boolean>
	deleteUser: (userId: string) => Promise<{ message: string } | boolean>
}

export const AuthContext = createContext<AuthContent | null>(null)

interface AuthProviderProps {
	children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null)
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)
	const [role, setRole] = useState<"user" | "admin" | null>(null)

	// Verify function to check token
	const verify = async () => {
		try {
			const response = await axios.get("/api/auth/verify")
			if (response.data) {
				const role = response.data.role
				if (role === "admin") {
					setUser(response.data.admin)
				} else {
					setUser(response.data.user)
				}
				setRole(role)
				setIsAuthenticated(true)
			}
		} catch (error) {
			console.error("Verification failed:", error)
			setIsAuthenticated(false)
		} finally {
			setLoading(false)
		}
	}

	const register = async (formData: User | Admin, type: "user" | "admin") => {
		try {
			const endpoint = type === "admin" ? "/api/admin" : "/api/user"

			const response = await axios.post(endpoint, formData)
			setUser(response.data.user)
			setIsAuthenticated(true)
			setRole(type)
			setLoading(false)
			return true
		} catch (error: unknown) {
			console.error("Register failed:", error)
			setIsAuthenticated(false)
			if (error instanceof AxiosError) {
				return { message: error.response?.data?.message || error.message }
			}
			if (error instanceof Error) {
				return { message: error.message }
			}
			return { message: "An unknown error occurred" }
		}
	}

	const login = async (formData: LoginCredentials, type: "user" | "admin") => {
		try {
			const endpoint = type === "admin" ? "/api/admin/login" : "/api/user/login"

			const response = await axios.post(endpoint, formData)
			setUser(response.data.user)
			setIsAuthenticated(true)
			setRole(type)
			setLoading(false)
			return true
		} catch (error: unknown) {
			console.error("Login failed:", error)
			setIsAuthenticated(false)
			if (error instanceof AxiosError) {
				return { message: error.response?.data?.message || error.message }
			}
			if (error instanceof Error) {
				return { message: error.message }
			}
			return { message: "An unknown error occurred" }
		}
	}

	const logout = async () => {
		try {
			await axios.post("/api/auth/logout")
			setUser(null)
			setRole(null)
			setIsAuthenticated(false)
			return true
		} catch (error) {
			console.error("Logout failed:", error)
			if (error instanceof AxiosError) {
				return { message: error.response?.data?.message || error.message }
			}
			if (error instanceof Error) {
				return { message: error.message }
			}
			return { message: "An unknown error occurred" }
		}
	}

	const deleteUser = async (userId: string) => {
		try {
			const response = await axios.delete(`/api/user/${userId}`)

			// Handle success
			console.log("User deleted successfully:", response.data)
			return true
		} catch (error: unknown) {
			console.error("Delete user failed:", error)

			// Handle errors
			if (error instanceof AxiosError) {
				return {
					success: false,
					message: error.response?.data?.message || error.message,
				}
			}
			if (error instanceof Error) {
				return { success: false, message: error.message }
			}
			return { success: false, message: "An unknown error occurred." }
		}
	}

	useEffect(() => {
		verify()
	}, [])

	const value = {
		isAuthenticated,
		user,
		loading,
		role,
		verify,
		register,
		login,
		logout,
		deleteUser,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

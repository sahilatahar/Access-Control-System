import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { LoadingFullScreen } from "../components/Loading"

function AuthRedirect({ children }: { children: ReactNode }) {
	const { isAuthenticated, role, loading } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (loading) return

		if (isAuthenticated) {
			// If user is logged in, redirect to the appropriate page
			if (role === "admin") {
				navigate("/admin")
			} else {
				navigate("/user")
			}
		}
	}, [isAuthenticated, role, navigate, loading])

	if (loading) {
		return <LoadingFullScreen />
	}

	if (isAuthenticated) {
		return null
	}

	return <>{children}</>
}

export default AuthRedirect

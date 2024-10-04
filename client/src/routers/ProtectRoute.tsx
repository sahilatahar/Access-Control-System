import { ReactNode, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { LoadingFullScreen } from "../components/Loading"

function ProtectRoute({ children }: { children: ReactNode }) {
	const { isAuthenticated, loading, role } = useAuth()
	const navigate = useNavigate()
	const pathname = useLocation().pathname

	useEffect(() => {
		if (loading) return

		// Allow access to the login page for unauthenticated users
		if (!isAuthenticated && !pathname.includes("/admin/login")) {
			// Redirect to login if not authenticated
			if (pathname.startsWith("/user")) {
				navigate("/login")
			} else {
				navigate("/admin/login")
			}
		} else if (role === "admin" && pathname.startsWith("/user")) {
			navigate("/not-authorized")
		} else if (role === "user" && pathname.startsWith("/admin")) {
			navigate("/not-authorized")
		}
	}, [isAuthenticated, loading, role, navigate, pathname])

	if (loading) {
		return <LoadingFullScreen />
	}

	if (!isAuthenticated && !pathname.includes("login")) {
		return null
	}

	return <>{children}</>
}

export default ProtectRoute

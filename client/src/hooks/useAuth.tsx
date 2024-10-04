import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"

function useAuth() {
	const context = useContext(AuthContext)

	if (!context) {
		throw Error("useAuth must be used within AuthProvider")
	}

	return context
}

export default useAuth

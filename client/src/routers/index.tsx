import { createBrowserRouter } from "react-router-dom"
import AdminPage from "../pages/Admin"
import AdminLoginPage from "../pages/auth/AdminLogin"
import HomePage from "../pages/Home"
import LoginPage from "../pages/auth/Login"
import NotAuthorize from "../pages/common/NotAuthorize"
import NotFound from "../pages/common/NotFound"
import RegisterPage from "../pages/auth/Register"
import UserPage from "../pages/User"
import ProtectRoute from "./ProtectRoute"
import AuthRedirect from "./AuthRedirect"
import Users from "../pages/admin/Users"
import AdminDashboard from "../pages/admin/Dashboard"

const routes = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/login",
		element: <AuthRedirect children={<LoginPage />} />,
	},
	{
		path: "/register",
		element: <AuthRedirect children={<RegisterPage />} />,
	},
	{
		path: "/admin/login",
		element: <AuthRedirect children={<AdminLoginPage />} />,
	},
	{
		path: "/admin",
		element: <ProtectRoute children={<AdminPage />} />,
		children: [
			{
				index: true,
				element: <AdminDashboard />,
			},
			{
				path: "users",
				element: <Users />,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
	{
		path: "/user",
		element: <ProtectRoute children={<UserPage />} />,
	},
	{
		path: "/not-authorized",
		element: <NotAuthorize />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
])

export default routes

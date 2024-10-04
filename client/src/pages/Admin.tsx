import { useState } from "react"
import AdminSidebar from "../components/admin/Sidebar"
import AdminNavbar from "../components/admin/Navbar"
import { Outlet } from "react-router-dom"

function AdminPage() {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)

	const toggleSidebar = () => {
		setSidebarOpen((pre: boolean) => !pre)
	}

	return (
		<div className="flex h-screen overflow-hidden">
			<AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
			<main className="w-full transition-all duration-300">
				<AdminNavbar toggleSidebar={toggleSidebar} />
				<Outlet context={{ sidebarOpen }} />
			</main>
		</div>
	)
}
export default AdminPage

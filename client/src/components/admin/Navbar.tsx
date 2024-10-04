import { Menu, User } from "lucide-react"
import { Link } from "react-router-dom"

interface AdminNavbarProps {
	toggleSidebar: () => void
}

function AdminNavbar({ toggleSidebar }: AdminNavbarProps) {
	return (
		<nav className="flex h-[70px] w-full items-center justify-between gap-4 bg-background-card shadow-lg transition-all duration-150 px-6">
			<button className="" onClick={toggleSidebar}>
				<Menu className="h-8 w-8 text-text-primary" />
			</button>
			<Link
				to="/admin/profile"
				className="flex gap-2 text-lg font-medium text-text-secondary hover:text-primary"
			>
				<User />
				<span>Profile</span>
			</Link>
		</nav>
	)
}

export default AdminNavbar

import { useWindowSize } from "@uidotdev/usehooks"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

interface AdminSidebarProps {
	sidebarOpen: boolean
	setSidebarOpen: (v: boolean) => void
}

function AdminSidebar({ sidebarOpen, setSidebarOpen }: AdminSidebarProps) {
	const { width } = useWindowSize()
	const { user } = useAuth()

	const hideSidebar = () => {
		if (width && width < 768) {
			setSidebarOpen(false)
		}
	}

	return (
		<aside
			className={`duration-15 fixed left-0 top-[70px] z-10 flex h-screen flex-grow flex-col items-center gap-8 overflow-hidden border-r border-text-muted bg-white pt-8 shadow-box transition-all md:static md:shadow-none ${
				!sidebarOpen
					? "w-0 -translate-x-full"
					: "w-[300px] min-w-[300px] max-w-[300px] px-2"
			}`}
		>
			<div className="space-y-2">
				<img src="/admin.png" alt="admin logo" className="w-[100px] mx-auto" />
				<h1 className="text-xl font-medium text-center w-full truncate">
					{user?.name.split(" ")[0]}
				</h1>
			</div>
			<div className="w-full space-y-2">
				<Link
					to="/admin"
					className="block w-full cursor-pointer rounded-md border px-4 py-2 shadow-sm hover:font-medium hover:text-primary"
					onClick={hideSidebar}
				>
					Dashboard
				</Link>
				<Link
					to="/admin/users"
					className="block w-full cursor-pointer rounded-md border px-4 py-2 shadow-sm hover:font-medium hover:text-primary"
					onClick={hideSidebar}
				>
					Users
				</Link>
			</div>
		</aside>
	)
}
export default AdminSidebar

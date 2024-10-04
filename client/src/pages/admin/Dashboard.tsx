import useAuth from "../../hooks/useAuth"

function AdminDashboard() {
	const { user } = useAuth()
	return (
		<>
			<div className="gradient flex min-h-[calc(100vh-70px)] flex-col items-center justify-center gap-4">
				<h2 className="text-2xl md:text-4xl font-semibold">
					Welcome, {user?.name}
				</h2>
				<h3 className="text-sm font-medium">
					Dashboard will be designed later.
				</h3>
			</div>
		</>
	)
}
export default AdminDashboard

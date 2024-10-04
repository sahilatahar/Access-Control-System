import useAuth from "../hooks/useAuth"

function UserPage() {
	const { user, logout } = useAuth()

	if (!user) return

	return (
		<div className="min-h-screen flex items-center justify-center flex-col gap-8">
			<div className="text-center space-y-4">
				<h2 className="text-lg md:text-xl font-semibold">You are an User</h2>
				<h2 className="text-2xl md:text-4xl font-semibold">
					Welcome, {user.name}
				</h2>
			</div>
			<div className="overflow-x-auto py-2 transition-all duration-150 ease-in w-full md:w-[500px]">
				<table className="text-surface min-w-full table-auto text-left font-light">
					<tbody className="text-center font-medium">
						<tr>
							<th scope="col" className="border px-6 py-4">
								Name
							</th>
							<td className="whitespace-nowrap border px-6 py-4">
								{user.name}
							</td>
						</tr>
						<tr>
							<th scope="col" className="border px-6 py-4">
								Email
							</th>
							<td className="whitespace-nowrap border px-6 py-4">
								{user.email}
							</td>
						</tr>
						<tr>
							<th scope="col" className="border px-6 py-4">
								Age
							</th>
							<td className="whitespace-nowrap border px-6 py-4">{user.age}</td>
						</tr>
						<tr>
							<th scope="col" className="border px-6 py-4">
								Address
							</th>
							<td className="whitespace-nowrap border px-6 py-4">
								{user.address}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<button className="btn-full" onClick={logout}>
				Log Out
			</button>
		</div>
	)
}
export default UserPage

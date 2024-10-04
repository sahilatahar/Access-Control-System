import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useOutletContext } from "react-router-dom"
import * as data from "../../data/users"
import { User } from "../../types/user"
import useAuth from "../../hooks/useAuth"

interface OutletContextProps {
	sidebarOpen: boolean
}

function Users() {
	const [users, setUsers] = useState<User[]>([])
	const [currentPageNumber, setCurrentPageNumber] = useState(1)
	const [usersToDisplay, setUsersToDisplay] = useState<User[]>([])
	const [perPageData, setPerPageData] = useState<number>(5)
	const sectionRef = useRef<HTMLElement>(null)
	const { sidebarOpen } = useOutletContext<OutletContextProps>()
	const { deleteUser } = useAuth()

	const goOnPrevPage = () => {
		if (currentPageNumber === 1) return
		setCurrentPageNumber((prev) => prev - 1)
	}

	const goOnNextPage = () => {
		if (currentPageNumber === users.length / perPageData) return
		setCurrentPageNumber((prev) => prev + 1)
	}

	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		console.log(typeof e.target.value)
		setPerPageData(Number(e.target.value))
	}

	const handleUserDelete = async (userId: string | undefined) => {
		if (!userId) return

		const confirm = window.confirm(
			"Are you sure? You want to delete this user account"
		)

		if (confirm) {
			const res = await deleteUser(userId)

			if (typeof res === "boolean" && res) {
				alert("User Delete")
			} else if (typeof res === "object" && res.message) {
				alert(res.message)
			}
		}
	}

	useEffect(() => {
		const start = (currentPageNumber - 1) * perPageData
		const end = currentPageNumber * perPageData
		setUsersToDisplay(users.slice(start, end))
	}, [currentPageNumber, perPageData, users])

	useEffect(() => {
		// axios("/api/users").then((res) => {
		// 	setUsers(res.data)
		// 	setUsersToDisplay(res.data.slice(0, perPageData))
		// })
		setUsers(data.users)
	}, [perPageData])

	return (
		<section
			className="p-4 h-[calc(100vh-70px)] max-w-full overflow-auto overflow-x-hidden pb-20"
			ref={sectionRef}
		>
			<h1 className="text-3xl font-bold py-8 text-center">All Users</h1>
			<div>
				<select
					onChange={handleSelectChange}
					defaultValue={String(currentPageNumber)}
					className="rounded-md border px-4 py-2 shadow-sm outline-none"
				>
					{[5, 10, 15, 20, 25, 50].map((val) => {
						return (
							<option key={val} value={val}>
								{val}
							</option>
						)
					})}
				</select>
				<div
					className="overflow-x-auto py-2 transition-all duration-150 ease-in"
					style={{ width: sidebarOpen ? "calc(100vw - 350px)" : "100%" }}
				>
					<table className="text-surface min-w-full table-fixed text-left font-light">
						<thead className="text-center font-medium text-text-primary">
							<tr>
								<th scope="col" className="border px-6 py-4">
									Name
								</th>
								<th scope="col" className="border px-6 py-4">
									Email
								</th>
								<th scope="col" className="border px-6 py-4">
									Age
								</th>
								<th scope="col" className="border px-6 py-4">
									Address
								</th>
								<th scope="col" className="border px-6 py-4">
									Action
								</th>
							</tr>
						</thead>
						<tbody className="text-center font-medium text-text-primary">
							{usersToDisplay.map((user: User) => (
								<tr key={user._id}>
									<td className="whitespace-nowrap border px-6 py-4">
										{user.name}
									</td>
									<td className="whitespace-nowrap border px-6 py-4">
										{user.email}
									</td>
									<td className="whitespace-nowrap border px-6 py-4">
										{user.age}
									</td>
									<td className="whitespace-nowrap border px-6 py-4">
										{user.address}
									</td>
									<td className="whitespace-nowrap border px-6 py-4">
										<button
											className="flex-1 rounded-md bg-red-500 px-8 py-2 text-white"
											onClick={() => handleUserDelete(user?._id)}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="flex justify-end gap-2 pt-4">
					<button
						onClick={goOnPrevPage}
						className="rounded-md border px-4 py-2 shadow-sm"
					>
						Prev
					</button>
					<button
						onClick={goOnNextPage}
						className="rounded-md border px-4 py-2 shadow-sm"
					>
						Next
					</button>
				</div>
			</div>
		</section>
	)
}
export default Users

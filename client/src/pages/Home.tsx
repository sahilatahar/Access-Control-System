import { Link } from "react-router-dom"

function HomePage() {
	return (
		<div className="min-h-screen flex sm:items-center sm:justify-evenly gap-4 bg-green-100 flex-col sm:flex-row items-center p-8">
			<div className="w-[250px] md:w-[300px] shadow-box p-4 md:p-8 rounded-lg bg-white aspect-square flex flex-col items-center justify-center">
				<h1 className="pb-6 text-xl md:text-2xl font-medium">User Routes</h1>
				<div className="flex flex-col gap-4 text-lg items-center">
					<Link
						to="/login"
						className="text-primary font-medium hover:underline"
					>
						User Login
					</Link>

					<Link
						to="/register"
						className="text-primary font-medium hover:underline"
					>
						User Registration
					</Link>

					<Link to="/user" className="text-primary font-medium hover:underline">
						User Dashboard
					</Link>
				</div>
			</div>
			<div className="w-[250px] md:w-[300px] shadow-box p-4 md:p-8 rounded-lg bg-white aspect-square flex flex-col justify-center items-center">
				<h1 className="pb-6 text-xl md:text-2xl font-medium">Admin Routes</h1>
				<div className="flex flex-col gap-4 text-lg items-center">
					<Link
						to="/admin/login"
						className="text-primary font-medium hover:underline"
					>
						Admin Login
					</Link>

					<Link
						to="/admin"
						className="text-primary font-medium hover:underline"
					>
						Admin Dashboard
					</Link>
				</div>
			</div>
		</div>
	)
}

export default HomePage

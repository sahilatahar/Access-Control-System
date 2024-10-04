function NotAuthorize() {
	return (
		<>
			<div className="gradient flex min-h-[calc(100vh-70px)] flex-col items-center justify-center gap-4">
				<h1 className="text-8xl font-bold">403</h1>
				<h2 className="text-4xl font-semibold">
					Sorry, you are not authorized to access this page.
				</h2>
			</div>
		</>
	)
}

export default NotAuthorize

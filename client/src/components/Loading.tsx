import { Bars } from "react-loader-spinner"

function Loading() {
	return (
		<main className="flex h-[300px] items-center justify-center">
			<Bars color="#22c55e" width={40} />
		</main>
	)
}

function LoadingPage() {
	return (
		<main className="flex min-h-[calc(100vh-70px)] items-center justify-center">
			<Loading />
		</main>
	)
}

function LoadingFullScreen() {
	return (
		<div className="bg-light fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center">
			<Loading />
		</div>
	)
}

export { Loading, LoadingPage, LoadingFullScreen }

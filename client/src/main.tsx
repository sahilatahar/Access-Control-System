import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import routes from "./routers"
import "./styles/index.css"
import AuthProvider from "./providers/AuthProvider"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<RouterProvider router={routes} />
		</AuthProvider>
	</StrictMode>
)

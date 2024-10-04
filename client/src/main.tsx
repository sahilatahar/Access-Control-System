import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import AuthProvider from "./providers/AuthProvider"
import routes from "./routers"
import "./styles/index.css"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<RouterProvider router={routes} />
		</AuthProvider>
	</StrictMode>
)

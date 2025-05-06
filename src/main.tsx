import { createBrowserRouter, RouterProvider } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import BusinessUnit from "./pages/BusinessUnit.tsx";
import ComingSoon from "./pages/ComingSoon.tsx";
import Admin from "./pages/admin/Admin.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/?business-unit/:bu",
		element: <BusinessUnit />,
	},
	{
		path: "/coming-soon",
		element: <ComingSoon />,
	},
	{
		path: "/admin",
		element: <Admin />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);

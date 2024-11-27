import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage.tsx";
import Layout from "./layouts/Layout.tsx";
import PageName from "./pages/PageName/PageName.tsx";
import DesignSystem from "./pages/DesignSystem/DesignSystem.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Homepage />,
	},
	{
		path: "/page",
		element: <PageName />,
	},
	{
		path: "/designsystem",
		element: <DesignSystem />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Layout>
			<RouterProvider router={router} />
		</Layout>
	</StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./graphQL/apolloClient.ts";
import Registration from "./pages/Registration/Registration.tsx";

import Homepage from "@/pages/Homepage/Homepage.tsx";
import DesignSystem from "@/pages/DesignSystem/DesignSystem.tsx";
import WelcomePageLayout from "@/layouts/WelcomePage/WelcomePageLayout.tsx";
import WelcomePageLayoutLight from "@/layouts/WelcomePage/WelcomePageLayoutLight.tsx";
import Services from "@/pages/WelcomePage/Services.tsx";
import Contact from "@/pages/WelcomePage/Contact.tsx";
import Login from "@/pages/Login/Login.tsx";

const router = createBrowserRouter([
	{
		// Header and footer layout
		element: <WelcomePageLayout />,
		children: [
			{
				path: "/",
				element: <Homepage />,
			},
			{
				path: "/services",
				element: <Services />,
			},
			{
				path: "/contact",
				element: <Contact />,
			},
		],
	},
	{
		// Header-only layout
		element: <WelcomePageLayoutLight />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/registration",
				element: <Registration />,
			},
		],
	},
	{
		path: "/designsystem",
		element: <DesignSystem />,
	},
	{
		path: "/login",
		element: <Login />,
	},
]);

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ApolloProvider client={client}>
			<RouterProvider router={router} />
		</ApolloProvider>
	</StrictMode>,
);

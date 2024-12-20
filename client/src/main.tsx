import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./graphQL/apolloClient.ts";
import Registration from "./pages/Registration/Registration.tsx";

import WelcomePageLayout from "@/layouts/WelcomePage/WelcomePageLayout.tsx";
import WelcomePageHeaderLayout from "./layouts/WelcomePage/WelcomePageHeaderLayout.tsx";
import Homepage from "@/pages/Homepage/Homepage.tsx";
import DesignSystem from "@/pages/DesignSystem/DesignSystem.tsx";
import Services from "@/pages/WelcomePage/Services.tsx";
import Contact from "@/pages/WelcomePage/Contact.tsx";
import Login from "@/pages/Login/Login.tsx";
import ResetPassword from "./pages/Login/ResetPassword.tsx";
import ResetLink from "./pages/Login/ResetLink.tsx";
import NewPassword from "./pages/Login/NewPassword.tsx";

const router = createBrowserRouter([
	{
		path: "/",
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
		path: "/",
		element: <WelcomePageHeaderLayout />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/registration",
				element: <Registration />,
			},
			{
				path: "/reset-password",
				element: <ResetPassword />,
			},
			{
				path: "/reset-link",
				element: <ResetLink />,
			},
			{
				path: "/new-password",
				element: <NewPassword />,
			},
		],
	},
	{
		path: "/designsystem",
		element: <DesignSystem />,
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

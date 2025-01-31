import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.scss";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./context/AuthContext.tsx";

import client from "./graphQL/apolloClient.ts";
import AuthGuard from "./layouts/AuthGuard/AuthGuard.tsx";

// All layouts in alphabetical order
import DashLayout from "./layouts/Dashboard/DashLayout.tsx";
import WelcomePageLayout from "@/layouts/WelcomePage/WelcomePageLayout.tsx";

// All pages in alphabetical order
import Contact from "@/pages/WelcomePage/Contact.tsx";
import DesignSystem from "@/pages/DesignSystem/DesignSystem.tsx";
import ErrorPage from "@/pages/Handling/ErrorPage.tsx";
import Homepage from "@/pages/Homepage/Homepage.tsx";
import Id from "@/pages/Trainer/Customers/:id/Id.tsx";
import List from "@/pages/Trainer/Customers/List/List.tsx";
import Login from "@/pages/Login/Login.tsx";
import NewPassword from "@/pages/Login/NewPassword.tsx";
import Profile from "@/pages/Profile/Profile.tsx";
import Registration from "@/pages/Registration/Registration.tsx";
import ResetPassword from "@/pages/Login/ResetPassword.tsx";
import ResetLink from "@/pages/Login/ResetLink.tsx";
import Services from "@/pages/WelcomePage/Services.tsx";

import TestME from "./components/TestME.tsx";

const router = createBrowserRouter([
	{
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <WelcomePageLayout />,
				children: [
					{
						path: "",
						element: <Homepage />,
					},
					{
						path: "services",
						element: <Services />,
					},
					{
						path: "contact",
						element: <Contact />,
					},
					{
						path: "login",
						element: <Login />,
					},
					{
						path: "registration",
						element: <Registration />,
					},
					{
						path: "reset-password",
						element: <ResetPassword />,
					},
					{
						path: "reset-link",
						element: <ResetLink />,
					},
					{
						path: "new-password",
						element: <NewPassword />,
					},
				],
			},
			{
				path: "dashboard",
				element: (
					<AuthGuard allowedRoles={["owner", "trainer"]}>
						<DashLayout />
					</AuthGuard>
				),
				children: [
					{
						path: "owner",
						element: <AuthGuard allowedRoles={["owner"]} />,
						children: [
							{
								index: true,
								element: <Navigate to="planning" replace />,
							},
							{
								path: "planning",
								element: <p>Owner planning</p>,
							},
							{
								path: "search",
								children: [
									{
										index: true,
										element: <p>search List</p>,
									},
									{
										path: ":id",
										element: <p>search/:id</p>,
									},
								],
							},
							{
								path: "my-dogs",
								children: [
									{
										index: true,
										element: <p>my-dogs List</p>,
									},
									{
										path: "new",
										element: <p>my-dogs/new</p>,
									},
									{
										path: "profile/:id",
										element: <p>my-dogs/profile/:id</p>,
									},
								],
							},
						],
					},
					{
						path: "trainer",
						element: <AuthGuard allowedRoles={["trainer"]} />,
						children: [
							{
								index: true,
								element: <Navigate to="planning" replace />,
							},
							{
								path: "planning",
								children: [
									{
										index: true,
										element: <p>Trainer planning</p>,
									},
									{
										path: "new",
										element: <p>planning/new</p>,
									},
									{
										path: "my-events",
										children: [
											{
												index: true,
												element: <p>planning/events</p>,
											},
											{
												path: ":id",
												element: <p>planning/events/:id</p>,
											},
										],
									},
								],
							},
							{
								path: "customers",
								children: [
									{
										index: true,
										element: <List />,
									},
									{
										path: ":id",
										element: <Id />,
									},
								],
							},
							{
								path: "dogs",
								children: [
									{
										index: true,
										element: <p>dogs List</p>,
									},
									{
										path: ":id",
										element: <p>dogs/:id</p>,
									},
								],
							},
						],
					},
					{
						path: "my-profile",
						children: [
							{
								index: true,
								element: <Profile />,
							},
							{
								path: "preferences",
								element: <p>Paramètres de l’application</p>,
							},
						],
					},
				],
			},
			{
				path: "designsystem",
				element: <DesignSystem />,
			},
		],
	},
]);

const rootElement = document.getElementById("root");

if (rootElement == null) {
	throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
	<StrictMode>
		<ApolloProvider client={client}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</ApolloProvider>
	</StrictMode>,
);

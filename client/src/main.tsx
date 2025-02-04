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
import "./styles/global.scss";

import WelcomePageLayout from "@/layouts/WelcomePage/WelcomePageLayout.tsx";
import DashLayout from "./layouts/Dashboard/DashLayout.tsx";
import AuthGuard from "./layouts/AuthGuard/AuthGuard.tsx";

import Homepage from "@/pages/Homepage/Homepage.tsx";
import DesignSystem from "@/pages/DesignSystem/DesignSystem.tsx";
import Services from "@/pages/WelcomePage/Services.tsx";
import Contact from "@/pages/WelcomePage/Contact.tsx";
import Login from "@/pages/Login/Login.tsx";
import Registration from "./pages/Registration/Registration.tsx";
import ResetPassword from "./pages/Login/ResetPassword.tsx";
import ResetLink from "./pages/Login/ResetLink.tsx";
import NewPassword from "./pages/Login/NewPassword.tsx";
import PlanningTrainer from "./pages/Planning/PlanningTrainer.tsx";
import PlanningOwner from "./pages/Planning/PlanningOwner.tsx";
import ErrorPage from "./pages/Handling/ErrorPage.tsx";
import TestFileUpload from "./components/TestFileUpload.tsx";

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
								element: <PlanningOwner />,
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
										element: <PlanningTrainer />,
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
										element: <p>customers List</p>,
									},
									{
										path: ":id",
										element: <p>customers/:id</p>,
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
								element: <TestME />,
							},
							{
								path: "personal-information",
								element: <p>Informations personnelles</p>,
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
			{
				path: "test",
				element: <TestFileUpload />,
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

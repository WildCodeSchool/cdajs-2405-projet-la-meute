import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import client from "./graphQL/apolloClient.ts";

// Style
import "./styles/global.scss";

// Providers
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./context/AuthContext.tsx";
import AuthGuard from "./layouts/AuthGuard/AuthGuard.tsx";

// Layouts
import DashLayout from "./layouts/Dashboard/DashLayout.tsx";
import WelcomePageLayout from "@/layouts/WelcomePage/WelcomePageLayout.tsx";

// Components
import Contact from "@/pages/WelcomePage/Contact.tsx";
import CustomerId from "./pages/Trainer/Customers/CustomerId/CustomerId.tsx";
import CustomerList from "./pages/Trainer/Customers/CustomerList/CustomerList.tsx";
import DesignSystem from "@/pages/DesignSystem/DesignSystem.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import EventId from "./pages/Event/EventId/EventId.tsx";
import EventList from "./pages/Event/EventList/EventList.tsx";
import Homepage from "@/pages/Homepage/Homepage.tsx";
import Login from "@/pages/Login/Login.tsx";
import NewPassword from "./pages/Login/NewPassword.tsx";
import Planning from "./pages/Planning/Planning.tsx";
import Profile from "@/pages/Profile/Profile.tsx";
import Registration from "./pages/Registration/Registration.tsx";
import ResetLink from "./pages/Login/ResetLink.tsx";
import ResetPassword from "./pages/Login/ResetPassword.tsx";
import Services from "@/pages/WelcomePage/Services.tsx";
import TestFileUpload from "./components/TestFileUpload.tsx";

// FIXME: delete
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
				path: "owner",
				element: (
					<AuthGuard allowedRoles={["owner"]}>
						<DashLayout />
					</AuthGuard>
				),
				children: [
					{
						index: true,
						element: <Navigate to="planning" replace />,
					},
					{
						path: "planning",
						element: <Planning />,
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
				element: (
					<AuthGuard allowedRoles={["trainer"]}>
						<DashLayout />
					</AuthGuard>
				),
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
								element: <Planning />,
							},
							{
								path: "new",
								element: <EventId />,
							},
							{
								path: "my-events",
								children: [
									{
										index: true,
										element: <EventList />,
									},
									{
										path: ":id",
										element: <EventId />,
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
								element: <CustomerList />,
							},
							{
								path: ":id",
								element: <CustomerId />,
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
				element: (
					<AuthGuard allowedRoles={["trainer", "owner"]}>
						<DashLayout />
					</AuthGuard>
				),
				children: [
					{
						index: true,
						element: <Profile />,
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
	// FIXME: delete -----------------------
	{
		path: "/",
		element: (
			<DashLayout />
		),
		children: [
			{
				path: "designsystem",
				element: <DesignSystem />,
			},
			{
				path: "test",
				element: <TestFileUpload />,
			},
			{
				path: "testme",
				element: <TestME />,
			},
		]
	}
	// -------------------------------------
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

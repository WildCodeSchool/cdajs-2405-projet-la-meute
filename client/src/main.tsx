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
import CreateDog from "./pages/Owner/Dogs/CreateDog/CreateDog.tsx";
import CustomerId from "./pages/Trainer/Customers/CustomerId/CustomerId.tsx";
import SearchPage from "./pages/SearchPage/SearchPage.tsx";
import DesignSystem from "@/pages/DesignSystem/DesignSystem.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import EventId from "./pages/Event/EventId/EventId.tsx";
import EventList from "./pages/Event/EventList/EventList.tsx";
import Homepage from "@/pages/Homepage/Homepage.tsx";
import Login from "@/pages/Login/Login.tsx";
import NewPassword from "./pages/Login/NewPassword.tsx";
import MyDogList from "./pages/Owner/Dogs/DogList/MyDogList.tsx";
import Planning from "./pages/Planning/Planning.tsx";
import EventDetail from "./pages/Event/EventDetail/EventDetail.tsx";
import EventUpdate from "./pages/Event/EventUpdate/EventUpdate.tsx";
import Profile from "@/pages/Profile/Profile.tsx";
import Registration from "./pages/Registration/Registration.tsx";
import ResetLink from "./pages/Login/ResetLink.tsx";
import ResetPassword from "./pages/Login/ResetPassword.tsx";
// import Services from "@/pages/WelcomePage/Services.tsx";
import FAQ from "@/pages/WelcomePage/FAQ.tsx";
import UpdateDog from "./pages/Owner/Dogs/UpdateDog/UpdateDog.tsx";
import PrivacyPolicy from "./pages/WelcomePage/PrivacyPolicy.tsx";
import LegalNotice from "./pages/WelcomePage/LegalNotice.tsx";
import GeneralTerms from "./pages/WelcomePage/GeneralTerms.tsx";

// FIXME: delete
import TestME from "./components/TestME.tsx";
import TestModal from "./components/TestModal.tsx";
import { ToastContainer } from "react-toastify";

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
						path: "FAQ",
						element: <FAQ />,
					},
					{
						path: "privacy-policy",
						element: <PrivacyPolicy />,
					},
					{
						path: "legal-notice",
						element: <LegalNotice />,
					},
					{
						path: "general-terms",
						element: <GeneralTerms />,
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
						children: [
							{
								index: true,
								element: <Planning />,
							},
							{
								path: "my-events",
								children: [
									{
										path: ":id",
										element: <EventDetail />,
									},
								],
							},
						],
					},
					{
						path: "search",
						children: [
							{
								index: true,
								element: <SearchPage />,
							},
						],
					},
					{
						path: "my-dogs",
						children: [
							{
								index: true,
								element: <MyDogList />,
							},
							{
								path: "new",
								element: <CreateDog />,
							},
							{
								path: "profile/:id",
								element: <UpdateDog />,
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
										element: <EventDetail />,
									},
									{
										path: ":id/edit",
										element: <EventUpdate />,
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
								element: <SearchPage />,
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
		element: <DashLayout />,
		children: [
			{
				path: "designsystem",
				element: <DesignSystem />,
			},
			{
				path: "test",
				element: <TestModal />,
			},
			{
				path: "testme",
				element: <TestME />,
			},
		],
	},
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
				<ToastContainer theme="colored" />
			</AuthProvider>
		</ApolloProvider>
	</StrictMode>,
);

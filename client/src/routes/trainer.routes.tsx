import { Navigate } from "react-router-dom";
import { planningLoader } from "@/routesLoaders/planning.loader";

import AuthGuard from "@/layouts/AuthGuard/AuthGuard";
import DashLayout from "@/layouts/Dashboard/DashLayout";

import EventUpdate from "@/pages/Event/EventUpdate/EventUpdate";
import Planning from "@/pages/Planning/Planning";
import SearchPage from "@/pages/SearchPage/SearchPage";
import CustomerId from "@/pages/Trainer/Customers/CustomerId/CustomerId";
import EventCreate from "@/pages/Event/EventCreator/EventCreate";

export const trainerRoutes = {
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
					loader: planningLoader,
				},
				{
					path: "event",
					children: [
						{
							path: "new",
							element: <EventCreate />,
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
					element: <p>dogs List</p>, // FIXME: feature not yet defined – purpose of this route is unclear
				},
			],
		},
	],
};

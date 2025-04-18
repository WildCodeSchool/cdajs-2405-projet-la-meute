import { Navigate } from "react-router-dom";

import AuthGuard from "@/layouts/AuthGuard/AuthGuard";
import DashLayout from "@/layouts/Dashboard/DashLayout";

import EventId from "@/pages/Event/EventId/EventId";
import EventUpdate from "@/pages/Event/EventUpdate/EventUpdate";
import Planning from "@/pages/Planning/Planning";
import SearchPage from "@/pages/SearchPage/SearchPage";
import CustomerId from "@/pages/Trainer/Customers/CustomerId/CustomerId";

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
				},
				{
					path: "event",
					children: [
						{
							path: "new",
							element: <EventId />, // FIXME: renommer ce composant ?
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
					element: <p>dogs List</p>, // FIXME: commenter ce à quoi cette route va servir ++
				},
			],
		},
	],
};

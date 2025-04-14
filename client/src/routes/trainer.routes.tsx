import AuthGuard from "@/layouts/AuthGuard/AuthGuard";
import DashLayout from "@/layouts/Dashboard/DashLayout";
import EventId from "@/pages/Event/EventId/EventId";
import EventList from "@/pages/Event/EventList/EventList";
import EventUpdate from "@/pages/Event/EventUpdate/EventUpdate";
import Planning from "@/pages/Planning/Planning";
import SearchPage from "@/pages/SearchPage/SearchPage";
import CustomerId from "@/pages/Trainer/Customers/CustomerId/CustomerId";
import { Navigate } from "react-router-dom";

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
					path: "events",
					children: [
						{
							index: true,
							element: <EventList />, // To Do split planning comp and move events list here
						},
						{
							path: "new",
							element: <EventId />,
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
			],
		},
	],
};

import AuthGuard from "@/layouts/AuthGuard/AuthGuard";
import DashLayout from "@/layouts/Dashboard/DashLayout";
import EventDetail from "@/pages/Event/EventDetail/EventDetail";
import Profile from "@/pages/Profile/Profile";
import DogId from "@/pages/Trainer/DogId/DogId";
import type { RouteObject } from "react-router-dom";

export const sharedEventRoutes: RouteObject = {
	path: "event",
	element: (
		<AuthGuard allowedRoles={["trainer", "owner"]}>
			<DashLayout />
		</AuthGuard>
	),
	children: [
		{
			path: ":id",
			element: <EventDetail />,
		},
	],
};

export const sharedProfileRoutes: RouteObject = {
	path: "profile",
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
			path: "public/trainer/:id",
			element: "trainer profile",
		},
		{
			path: "public/owner/:id",
			element: "owner profile",
		},
		{
			path: "public/dog/:id",
			element: <DogId />,
		},
	],
};

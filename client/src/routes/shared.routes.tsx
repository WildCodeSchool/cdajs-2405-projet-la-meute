import type { RouteObject } from "react-router-dom";

import AuthGuard from "@/layouts/AuthGuard/AuthGuard";
import DashLayout from "@/layouts/Dashboard/DashLayout";

import EventDetail from "@/pages/Event/EventDetail/EventDetail";
import Profile from "@/pages/Profile/Profile";
import DogId from "@/pages/Trainer/DogId/DogId";

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
			path: "public/trainer/:id", // FIXME: "public" est-il necessaire du coup ? Si on considère que les profils sont public, pas besoin de le préciser dans la route
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

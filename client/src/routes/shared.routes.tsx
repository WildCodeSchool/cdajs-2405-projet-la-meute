import type { RouteObject } from "react-router-dom";

import AuthGuard from "@/layouts/AuthGuard/AuthGuard";
import DashLayout from "@/layouts/Dashboard/DashLayout";

import EventDetail from "@/pages/Event/EventDetail/EventDetail";
import Profile from "@/pages/Profile/Profile";
import DogId from "@/pages/Trainer/DogId/DogId";
import OwnerId from "@/pages/Owner/OwnerId";

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
		{
			path: ":eventId/dog/:id",
			element: <DogId source="event" backButtonText="Retour à l'évènement" />,
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
			element: <Profile />, // Private profile of the authenticated user
		},
		{
			path: "view/trainer/:id",
			element: "trainer profile", // View another trainer's profile
		},
		{
			path: "view/owner/:id",
			element: <OwnerId />, // View another owner's profile
		},
		{
			path: "view/dog/:id",
			element: <DogId backButtonText="Retour à la liste " />, // View another owner's dog profile
		},
	],
};

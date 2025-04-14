import AuthGuard from "@/layouts/AuthGuard/AuthGuard";
import DashLayout from "@/layouts/Dashboard/DashLayout";
import CreateDog from "@/pages/Owner/Dog/CreateDog/CreateDog";
import MyDogList from "@/pages/Owner/Dog/DogList/MyDogList";
import UpdateDog from "@/pages/Owner/Dog/UpdateDog/UpdateDog";
import Planning from "@/pages/Planning/Planning";
import SearchPage from "@/pages/SearchPage/SearchPage";
import { Navigate } from "react-router-dom";

export const ownerRoutes = {
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
					path: "events",
					children: [
						{
							index: true,
							element: "events list",
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
			path: "events",
			children: [
				{
					index: true,
					element: "Events list",
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
};

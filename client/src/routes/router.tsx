import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import { publicRoutes } from "./public.routes";
import { ownerRoutes } from "./owner.routes";
import { trainerRoutes } from "./trainer.routes";
import { sharedProfileRoutes, sharedEventRoutes } from "./shared.routes";

export const router = createBrowserRouter([
	{
		errorElement: <ErrorPage />,
		children: [
			publicRoutes,
			ownerRoutes,
			trainerRoutes,
			sharedEventRoutes,
			sharedProfileRoutes,
		],
	},
]);

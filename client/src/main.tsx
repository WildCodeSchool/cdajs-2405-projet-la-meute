import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/router";
import { AppProviders } from "@/providers/AppProviders";
import "@/styles/global.scss";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("<div id='root'></div> requis");

createRoot(rootElement).render(
	<StrictMode>
		<AppProviders>
			<RouterProvider router={router} />
		</AppProviders>
	</StrictMode>,
);

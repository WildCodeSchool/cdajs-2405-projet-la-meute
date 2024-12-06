import Header from "@/layouts/WelcomePage/Header";
import { Outlet } from "react-router-dom";
import "./WelcomePageLayoutLight.scss";

export default function WelcomePageLayout() {
	return (
		<>
			<Header />
			<main className="welcomePageLayoutLight__main">
				<Outlet />
			</main>
		</>
	);
}

import Header from "@/layouts/WelcomePage/Header";
import { Outlet } from "react-router-dom";

export default function WelcomePageHeaderLayout() {
	return (
		<>
			<Header />
			<section className="welcomePageHeaderLayout__main">
				<Outlet />
			</section>
		</>
	);
}

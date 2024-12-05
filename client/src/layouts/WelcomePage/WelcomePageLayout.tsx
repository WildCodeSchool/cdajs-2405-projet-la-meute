import Footer from "@/components/WelcomePage/Footer";
import Header from "@/components/WelcomePage/Header";
import { Outlet } from "react-router-dom";

export default function WelcomePageLayout() {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

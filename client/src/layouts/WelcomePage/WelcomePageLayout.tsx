import Footer from "@/layouts/WelcomePage/Footer";
import Header from "@/layouts/WelcomePage/Header";
import { Outlet } from "react-router-dom";
import FillerContent from "./FillerContent/FillerContent";

export default function WelcomePageLayout() {
	return (
		<>
			<Header />
			<section className="welcomePageHeaderLayout__main">
				<Outlet />
			</section>
			<FillerContent />
			<Footer />
		</>
	);
}

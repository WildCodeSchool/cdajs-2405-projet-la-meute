import Footer from "@/layouts/WelcomePage/Footer";
import Header from "@/layouts/WelcomePage/Header";
import { Outlet, useLocation } from "react-router-dom";
import FillerContent from "./FillerContent/FillerContent";

export default function WelcomePageLayout() {
	const location = useLocation();
	const authRoutes = [
		"/login",
		"/registration",
		"/reset-password",
		"/forgot-password",
		"/new-password",
	];
	const hideFooter = authRoutes.some((route) => location.pathname === route);

	return (
		<>
			<Header />
			<section className="welcomePageHeaderLayout__main">
				<Outlet />
			</section>
			{!hideFooter && (
				<>
					<FillerContent />
					<Footer />
				</>
			)}
		</>
	);
}

import Footer from "@/layouts/WelcomePage/Footer";
import Header from "@/layouts/WelcomePage/Header";
import { Outlet, useLocation } from "react-router-dom";

export default function WelcomePageLayout() {
	const location = useLocation();
	const authRoutes = [
		"/login",
		"/registration",
		"/reset-password",
		"/reset-link",
		"/new-password",
	];
	const hideFooter = authRoutes.some((route) => location.pathname === route);

	return (
		<>
			<Header />
			<section className="welcomePageLayout__main">
				<Outlet />
			</section>
			{!hideFooter && <Footer />}
		</>
	);
}

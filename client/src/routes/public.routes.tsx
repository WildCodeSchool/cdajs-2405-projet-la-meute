import WelcomePageLayout from "@/layouts/WelcomePage/WelcomePageLayout";
import Homepage from "@/pages/Homepage/Homepage";
import FAQ from "@/pages/WelcomePage/FAQ";
import Contact from "@/pages/WelcomePage/Contact";
import Login from "@/pages/Login/Login";
import NewPassword from "@/pages/Login/NewPassword";
import ResetLink from "@/pages/Login/ResetLink";
import ResetPassword from "@/pages/Login/ResetPassword";
import Registration from "@/pages/Registration/Registration";
import GeneralTerms from "@/pages/WelcomePage/GeneralTerms";
import LegalNotice from "@/pages/WelcomePage/LegalNotice";
import PrivacyPolicy from "@/pages/WelcomePage/PrivacyPolicy";

export const publicRoutes = {
	path: "/",
	element: <WelcomePageLayout />,
	children: [
		{
			path: "",
			element: <Homepage />,
		},
		{
			path: "FAQ",
			element: <FAQ />,
		},
		{
			path: "privacy-policy",
			element: <PrivacyPolicy />,
		},
		{
			path: "legal-notice",
			element: <LegalNotice />,
		},
		{
			path: "general-terms",
			element: <GeneralTerms />,
		},
		{
			path: "contact",
			element: <Contact />,
		},
		{
			path: "login",
			element: <Login />,
		},
		{
			path: "registration", // FIXME: diviser les deux registrations ?
			element: <Registration />,
		},
		{
			path: "reset-password",
			element: <ResetPassword />,
		},
		{
			path: "forgot-password",
			element: <ResetLink />,
		},
		{
			path: "new-password",
			element: <NewPassword />,
		},
	],
};

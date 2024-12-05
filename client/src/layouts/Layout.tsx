import Footer from "./Footer";
import Header from "./Header";
import "./Layout.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<section>{children}</section>
			<Footer />
		</>
	);
}

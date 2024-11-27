import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<section>{children}</section>
			<Footer />
		</>
	);
}

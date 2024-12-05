import Footer from "@/layouts/WelcomePage/Footer";
import Header from "@/layouts/WelcomePage/Header";
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
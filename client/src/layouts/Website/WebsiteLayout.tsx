import Footer from "@/components/Website/Footer";
import Header from "@/components/Website/Header";
import { Outlet } from "react-router-dom";

export default function WebsiteLayout() {
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
import "./DashLayout.scss";
import DashHeader from "./DashHeader";
import DashSideBar from "./DashSideBar";
import { Outlet } from "react-router-dom";

export default function DashLayout() {
	return (
		<>
			<DashHeader />
			<DashSideBar />
			<section className="dashLayout__content">
				<Outlet />
			</section>
		</>
	);
}

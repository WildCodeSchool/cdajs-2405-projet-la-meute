import "./DashLayout.scss";
import DashHeader from "./DashHeader";
import DashSideBar from "./DashSideBar";
import { Outlet } from "react-router-dom";
import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";

export default function DashLayout() {
	return (
		<>
			<DashHeader />
			<DashSideBar />
			<section className="dashLayout__content">
				<PlanningHeader title="Planning" />
				<Outlet />
			</section>
		</>
	);
}

import { useLocation } from "react-router-dom";
import Logo from "@/assets/logo/beige/symbol/logo-pawplanner-symbol-beige.svg";

import { Calendar } from "@/assets/icons/calendar";
import { AddUser } from "@/assets/icons/add-user"; // TODO: Pas la bonne icône
import { Checkmark } from "@/assets/icons/checkmark";
import { Paw } from "@/assets/icons/paw";
import { Exit } from "@/assets/icons/exit";

export default function DashSideBar() {
	const location = useLocation();

	const isActive = (path: string) =>
		location.pathname.includes(path)
			? "dashSideBar__item dashSideBar__item--active"
			: "dashSideBar__item";

	return (
		<aside className="dashSideBar" aria-label="Navigation principale">
			<img
				className="dashSideBar__logo hidden__mobile"
				src={Logo}
				alt="Logo Paw Planner"
			/>
			<nav className="dashSideBar__nav">
				<ul className="dashSideBar__list">
					<li className={isActive("planning")}>
						<a href="/dash/planning" className="dashSideBar__link">
							<Calendar className="dashSideBar__icon" />
						</a>
					</li>
					<li className={isActive("add-event")}>
						<a href="/dash/add-event" className="dashSideBar__link">
							<Checkmark className="dashSideBar__icon" />
						</a>
					</li>
					{/* FIXME: designsystem n'est qu'un exemple en attendant les pages */}
					<li className={isActive("designsystem")}>
						<a href="/dash/designsystem" className="dashSideBar__link">
							<Paw className="dashSideBar__icon" />
						</a>
					</li>
					<li className={isActive("user")}>
						<a href="/dash/user" className="dashSideBar__link">
							<AddUser className="dashSideBar__icon" />
						</a>
					</li>
				</ul>
			</nav>
			<a href="/logout" className="dashSideBar__logout hidden__mobile">
				<Exit className="dashSideBar__icon" />
			</a>
		</aside>
	);
}

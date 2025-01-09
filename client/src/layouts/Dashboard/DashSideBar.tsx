import { useLocation } from "react-router-dom";
import Logo from "@/assets/logo/beige/symbol/logo-pawplanner-symbol-beige.svg";

import { Calendar } from "@/assets/icons/calendar";
import { AddUser } from "@/assets/icons/add-user"; // TODO: Pas la bonne icône
import { Checkmark } from "@/assets/icons/checkmark";
import { Paw } from "@/assets/icons/paw";
import { Exit } from "@/assets/icons/exit";

import { useAuth } from "@/hooks/useAuth";

export default function DashSideBar() {
	const location = useLocation();
	const { logout } = useAuth();

	const isActive = (path: string) =>
		location.pathname.includes(path)
			? "dashSideBar__item dashSideBar__item--active"
			: "dashSideBar__item";

	return (
		<aside className="dashSideBar" aria-label="Navigation principale">
			<a href="/" className="dashSideBar__logo hidden__mobile">
				<img src={Logo} alt="Logo Paw Planner" />
			</a>
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
			<button
				onClick={logout}
				type="button"
				className="dashSideBar__logout hidden__mobile"
				aria-label="Se déconnecter"
			>
				<Exit className="dashSideBar__icon" />
			</button>
		</aside>
	);
}

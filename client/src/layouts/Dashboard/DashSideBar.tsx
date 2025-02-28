import { useLocation } from "react-router-dom";
import Logo from "@/assets/logo/beige/symbol/logo-pawplanner-symbol-beige.svg";

import { Calendar } from "@/assets/icons/calendar";
import { Users } from "@/assets/icons/users";
import { Search } from "@/assets/icons/search";
import { Paw } from "@/assets/icons/paw";
import { Exit } from "@/assets/icons/exit";

import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";

const DashSideBar = () => {
	const location = useLocation();
	const { logout } = useAuth();
	const { role } = useUser();

	const userRole = role || "trainer";

	const isActive = (path: string) =>
		location.pathname.includes(path)
			? "dashSideBar__item dashSideBar__item--active"
			: "dashSideBar__item";

	const navItems = {
		trainer: [
			{ path: "planning", icon: <Calendar className="dashSideBar__icon" /> },
			{ path: "dogs", icon: <Paw className="dashSideBar__icon" /> },
			{ path: "customers", icon: <Users className="dashSideBar__icon" /> },
		],
		owner: [
			{ path: "planning", icon: <Calendar className="dashSideBar__icon" /> },
			{ path: "search", icon: <Search className="dashSideBar__icon" /> },
			{ path: "my-dogs", icon: <Paw className="dashSideBar__icon" /> },
		],
	};

	return (
		<aside className="dashSideBar" aria-label="Navigation principale">
			<a href={`/${userRole}`} className="dashSideBar__logo hidden__mobile">
				<img src={Logo} alt="Logo Paw Planner" />
			</a>
			<nav className="dashSideBar__nav">
				<ul className="dashSideBar__list">
					{navItems[userRole]?.map(({ path, icon }) => (
						<li key={path} className={isActive(path)}>
							<a href={`/${userRole}/${path}`} className="dashSideBar__link">
								{icon}
							</a>
						</li>
					))}
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
};

export default DashSideBar;

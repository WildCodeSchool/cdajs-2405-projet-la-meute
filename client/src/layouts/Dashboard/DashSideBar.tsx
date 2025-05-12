import { useLocation, Link } from "react-router-dom";
import Logo from "@/assets/logo/beige/symbol/logo-pawplanner-symbol-beige.svg";
import { Tooltip } from "react-tooltip";

import { Calendar } from "@/assets/icons/calendar";
import { Users } from "@/assets/icons/users";
import { Search } from "@/assets/icons/search";
import { Paw } from "@/assets/icons/paw";
import { Exit } from "@/assets/icons/exit";

import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { useIsMobile } from "@/hooks/checkIsMobile";

const DashSideBar = () => {
	const location = useLocation();
	const { logout } = useAuth();
	const { role } = useUser();
	const isMobile = useIsMobile();

	const userRole = role || "trainer";

	const isActive = (path: string) =>
		location.pathname.includes(path)
			? "dashSideBar__item dashSideBar__item--active"
			: "dashSideBar__item";

	const navItems = {
		trainer: [
			{
				path: "planning",
				icon: <Calendar className="dashSideBar__icon" />,
				label: "Planning",
			},
			{
				path: "dogs",
				icon: <Paw className="dashSideBar__icon" />,
				label: "Chiens",
			},
			{
				path: "customers",
				icon: <Users className="dashSideBar__icon" />,
				label: "Clients",
			},
		],
		owner: [
			{
				path: "planning",
				icon: <Calendar className="dashSideBar__icon" />,
				label: "Planning",
			},
			{
				path: "search",
				icon: <Search className="dashSideBar__icon" />,
				label: "Recherche",
			},
			{
				path: "my-dogs",
				icon: <Paw className="dashSideBar__icon" />,
				label: "Mes chiens",
			},
		],
	};

	return (
		<aside className="dashSideBar" aria-label="Navigation principale">
			<Link to={`/${userRole}`} className="dashSideBar__logo hidden__mobile">
				<img src={Logo} alt="Logo Paw Planner" />
			</Link>
			<nav className="dashSideBar__nav">
				<ul className="dashSideBar__list">
					{navItems[userRole]?.map(({ path, icon, label }) => (
						<li key={path} className={isActive(path)}>
							<Link
								to={`/${userRole}/${path}`}
								className="dashSideBar__link"
								data-tooltip-id={`tooltip-${path}`}
								data-tooltip-content={label}
							>
								{icon}
							</Link>
							<Tooltip
								id={`tooltip-${path}`}
								place={isMobile ? "top" : "right"}
								offset={40}
								className="dashSideBar__tooltip"
							/>
						</li>
					))}
				</ul>
			</nav>
			<button
				onClick={logout}
				type="button"
				className="dashSideBar__logout hidden__mobile"
				aria-label="Se déconnecter"
				data-tooltip-id="tooltip-logout"
				data-tooltip-content="Se déconnecter"
			>
				<Exit className="dashSideBar__icon" />
			</button>
			<Tooltip
				id="tooltip-logout"
				place={isMobile ? "top" : "right"}
				offset={40}
				className="dashSideBar__tooltip"
			/>
		</aside>
	);
};

export default DashSideBar;

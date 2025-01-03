import { useLocation } from "react-router-dom";
import Logo from "@/assets/logo/beige/symbol/logo-pawplanner-symbol-beige.svg";
import Calendrier from "@/assets/icons/calendrier.svg";
import Check from "@/assets/icons/add-event.svg";
import Patoune from "@/assets/icons/pattes.svg";
import Utilisateur from "@/assets/icons/ajout-dutilisateur.svg"; // TODO: Pas la bonne icône
import Exit from "@/assets/icons/sortir.svg";

export default function DashSideBar() {
	const location = useLocation();

	const isActive = (path: string) =>
		location.pathname.includes(path)
			? "dashSideBar__item dashSideBar__item--active"
			: "dashSideBar__item";

	return (
		<aside className="dashSideBar" aria-label="Navigation principale">
			<img
				className="dashSideBar__icon--main hidden__mobile"
				src={Logo}
				alt="Logo Paw Planner"
			/>
			<nav className="dashSideBar__nav">
				<ul className="dashSideBar__list">
					<li className={isActive("planning")}>
						<a href="/dash/planning" className="dashSideBar__link">
							<img
								className="dashSideBar__icon"
								src={Calendrier}
								alt="Calendrier"
							/>
						</a>
					</li>
					<li className={isActive("add-event")}>
						<a href="/dash/add-event" className="dashSideBar__link">
							<img
								className="dashSideBar__icon"
								src={Check}
								alt="Ajouter un événement"
							/>
						</a>
					</li>
					{/* FIXME: designsystem n'est qu'un exemple en attendant les pages */}
					<li className={isActive("designsystem")}>
						<a href="/dash/designsystem" className="dashSideBar__link">
							<img className="dashSideBar__icon" src={Patoune} alt="Pattes" />
						</a>
					</li>
					<li className={isActive("user")}>
						<a href="/dash/user" className="dashSideBar__link">
							<img
								className="dashSideBar__icon"
								src={Utilisateur}
								alt="Ajouter un utilisateur"
							/>
						</a>
					</li>
				</ul>
			</nav>
			<a href="/logout" className="dashSideBar__logout hidden__mobile">
				<img className="dashSideBar__icon" src={Exit} alt="Déconnexion" />
			</a>
		</aside>
	);
}

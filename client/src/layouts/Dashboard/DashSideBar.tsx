import Logo from "@/assets/logo/beige/symbol/logo-pawplanner-symbol-beige.svg";
import Calendrier from "@/assets/icons/calendrier.svg";
import Check from "@/assets/icons/add-event.svg";
import Patoune from "@/assets/icons/pattes.svg";
import Utilisateur from "@/assets/icons/ajout-dutilisateur.svg"; // TODO: Pas la bonne icone
import Exit from "@/assets/icons/sortir.svg";

export default function DashSideBar() {
	return (
		<>
			<aside className="dashSideBar">
				<img
					className="dashSideBar__logo--main"
					src={Logo}
					alt="Logo Paw Planner"
				/>
				<nav className="dashSideBar__nav">
					<img
						className="dashSideBar__logo"
						src={Calendrier}
						alt="Logo Paw Planner"
					/>
					<img
						className="dashSideBar__logo"
						src={Check}
						alt="Logo Paw Planner"
					/>
					<img
						className="dashSideBar__logo"
						src={Patoune}
						alt="Logo Paw Planner"
					/>
					<img
						className="dashSideBar__logo"
						src={Utilisateur}
						alt="Logo Paw Planner"
					/>
				</nav>
				<img className="dashSideBar__logo" src={Exit} alt="Logo Paw Planner" />
			</aside>
		</>
	);
}

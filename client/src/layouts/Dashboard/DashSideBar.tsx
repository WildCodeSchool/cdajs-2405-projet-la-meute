import Logo from "@/assets/logo/beige/symbol/logo-pawplanner-symbol-beige.svg";
import Calendrier from "@/assets/icons/calendrier.svg";
import Check from "@/assets/icons/add-event.svg";
import Patoune from "@/assets/icons/pattes.svg";
import Utilisateur from "@/assets/icons/ajout-dutilisateur.svg"; // TODO: Pas la bonne icône
import Exit from "@/assets/icons/sortir.svg";

/** TODO:
 * if window.location = untel, --active la bonne icone
 * juste un useState pour la classname
 */

export default function DashSideBar() {
	return (
		<aside className="dashSideBar" aria-label="Navigation principale">
			<img
				className="dashSideBar__icon--main hidden__mobile"
				src={Logo}
				alt="Logo Paw Planner"
			/>
			<nav className="dashSideBar__nav">
				<ul className="dashSideBar__list">
					<li className="dashSideBar__item">
						<a href="/" className="dashSideBar__link">
							<img
								className="dashSideBar__icon"
								src={Calendrier}
								alt="Calendrier"
							/>
						</a>
					</li>
					<li className="dashSideBar__item">
						<a href="/" className="dashSideBar__link">
							<img
								className="dashSideBar__icon"
								src={Check}
								alt="Ajouter un événement"
							/>
						</a>
					</li>
					<li className="dashSideBar__item dashSideBar__item--active">
						<a href="/" className="dashSideBar__link">
							<img
								className="dashSideBar__icon"
								src={Patoune}
								alt="Pattes" //FIXME:
							/>
						</a>
					</li>
					<li className="dashSideBar__item">
						<a href="/" className="dashSideBar__link">
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

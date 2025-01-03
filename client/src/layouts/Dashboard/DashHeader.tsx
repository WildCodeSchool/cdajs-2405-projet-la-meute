import { Bell } from "@/assets/icons/bell";
import Chevron from "@/assets/icons/left-chevron.png";

export default function DashHeader() {
	return (
		<>
			<header className="dashHeader">
				<h1 className="hidden__mobile">Header</h1>
				<a className=" dashHeader__back hidden__desktop" href="/">
					{/* TODO: insérer un logo de chevron ici */}
					<img src={Chevron} alt="Retour" className="dashHeader__back--icon" />
					Retour
				</a>
				<span className="dashHeader__right-corner">
					<Bell className="dashHeader__notification" />
					<img
						className="dashHeader__avatar"
						src="https://placehold.co/400"
						alt="avatar de l'utilisateur"
					/>
				</span>
			</header>
		</>
	);
}

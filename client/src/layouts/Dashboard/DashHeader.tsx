import Cloche from "@/assets/icons/cloche.svg";

export default function DashHeader() {
	return (
		<>
			<header className="dashHeader">
				<h1 className="hidden__mobile">Header</h1>
				<a className="hidden__desktop" href="/">
					{/* TODO: insérer un logo de chevron ici */}
					Retour
				</a>
				<span className="dashHeader__right-corner">
					<img
						className="dashHeader__notification"
						src={Cloche}
						alt="Notification"
					/>
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

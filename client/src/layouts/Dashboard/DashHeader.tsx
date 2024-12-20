import Cloche from "@/assets/icons/cloche.svg";

export default function DashHeader() {
	return (
		<>
			<header className="dashHeader">
				<h1>Header</h1>
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

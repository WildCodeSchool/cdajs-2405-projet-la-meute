import { Bell } from "@/assets/icons/bell";
import { LeftChevron } from "@/assets/icons/left-chevron";
import { useNavigate } from "react-router-dom";

export default function DashHeader() {
	const navigate = useNavigate();
	return (
		<>
			<header className="dashHeader">
				<h1 className="hidden__mobile">Header</h1>
				<button
					type="button"
					className="dashHeader__back hidden__desktop"
					onClick={() => {
						navigate(-1);
					}}
				>
					<LeftChevron className="dashHeader__back--icon" />
					Retour
				</button>
				<span className="dashHeader__right-corner">
					<Bell className="dashHeader__notification" />
					<a className="dashHeader__avatar" href="/dashboard/my-profile">
						<img src="https://placehold.co/400" alt="avatar de l'utilisateur" />
					</a>
				</span>
			</header>
		</>
	);
}

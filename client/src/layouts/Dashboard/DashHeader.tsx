import { Bell } from "@/assets/icons/bell";
import { LeftChevron } from "@/assets/icons/left-chevron";
import { useImageUrl } from "@/hooks/useImageUrl";
import { useUser } from "@/hooks/useUser";
import { useNavigate, Link } from "react-router-dom";

export default function DashHeader() {
	const { user } = useUser();

	const navigate = useNavigate();
	return (
		<>
			<header className="dashHeader">
				<h1 className="hidden__mobile">Bonjour {user?.firstname} !</h1>
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
					<Link className="dashHeader__avatar" to="/my-profile">
						<img
							src={
								user?.avatar
									? useImageUrl(user?.avatar)
									: useImageUrl("/upload/images/defaultuserprofile.jpg")
							}
							alt="avatar de l'utilisateur"
							title="Mon profil"
						/>
					</Link>
				</span>
			</header>
		</>
	);
}

import { useNavigate, Link, useLocation } from "react-router-dom";
import { Exit } from "@/assets/icons/exit";
import { LeftChevron } from "@/assets/icons/left-chevron";
import { useIsMobile } from "@/hooks/checkIsMobile";
import { useAuth } from "@/hooks/useAuth";
import { useImageUrl } from "@/hooks/useImageUrl";
import { useUser } from "@/hooks/useUser";

export default function DashHeader() {
	const { user } = useUser();
	const { logout } = useAuth();
	const navigate = useNavigate();
	const isMobile = useIsMobile();
	const location = useLocation();

	const hideBackButton = location.pathname.includes("planning");

	return (
		<>
			<header className="dashHeader">
				<h1 className="hidden__mobile">Bonjour {user?.firstname} !</h1>

				{isMobile && (
					<button
						type="button"
						className={`dashHeader__back hidden__desktop ${hideBackButton ? "dashHeader__back--invisible" : ""}`}
						onClick={() => {
							if (!hideBackButton) navigate(-1);
						}}
						aria-hidden={hideBackButton}
					>
						<LeftChevron className="dashHeader__back--icon" />
						Retour
					</button>
				)}

				<span className="dashHeader__right-corner">
					{isMobile && (
						<button
							onClick={logout}
							type="button"
							className="dashSideBar__logout"
							aria-label="Se déconnecter"
						>
							<Exit className="dashSideBar__icon dashHeader__icon" />
						</button>
					)}
					<Link className="dashHeader__avatar" to="/profile">
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

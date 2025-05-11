import { Exit } from "@/assets/icons/exit";
import { LeftChevron } from "@/assets/icons/left-chevron";
import { useIsMobile } from "@/hooks/checkIsMobile";
import { useAuth } from "@/hooks/useAuth";
import { useImageUrl } from "@/hooks/useImageUrl";
import { useUser } from "@/hooks/useUser";
import { useNavigate, Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

export default function DashHeader() {
	const { user } = useUser();
	const { logout } = useAuth();
	const navigate = useNavigate();
	const isMobile = useIsMobile();

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
					<Link
						className="dashHeader__avatar"
						to="/profile"
						data-tooltip-id="tooltip-my-profile"
						data-tooltip-content="Mon profil"
					>
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
					<Tooltip
						id="tooltip-my-profile"
						place="bottom"
						offset={30}
						className="dashSideBar__tooltip"
					/>
				</span>
			</header>
		</>
	);
}

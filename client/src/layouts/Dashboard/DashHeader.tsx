import { useNavigate, Link } from "react-router-dom";
import { Exit } from "@/assets/icons/exit";
import { LeftChevron } from "@/assets/icons/left-chevron";
import { useIsMobile } from "@/hooks/checkIsMobile";
import { useAuth } from "@/hooks/useAuth";
import { useImageUrl } from "@/hooks/useImageUrl";
import { useUser } from "@/hooks/useUser";
import { useNavigate, Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useNavigationTracker from "@/hooks/useNavigationTracker";

export default function DashHeader() {
	const { user } = useUser();
	const { logout } = useAuth();
	const navigate = useNavigate();
	const isMobile = useIsMobile();

	const { clickCount, resetClickCount } = useNavigationTracker();

	// Return to the previous page
	const handleBack = () => {
		navigate(-1);
	};

	// Logout and reset the counter to disable the backButton when user arrives on the dashboard
	const handleLogout = () => {
		logout();
		resetClickCount();
	};

	// Counter is first incremented when the user comes from login toward the dashboard
	// Each new navigation increments it, if counter > 1, the back button is active
	const backButtonClass =
		clickCount !== 1
			? "dashHeader__back"
			: "dashHeader__back dashHeader__back--invisible";

	return (
		<header className="dashHeader">
			<h1 className="hidden__mobile">Bonjour {user?.firstname} !</h1>
			{isMobile && (
				<button type="button" className={backButtonClass} onClick={handleBack}>
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

import { useNavigate, Link } from "react-router-dom";
import { Exit } from "@/assets/icons/exit";
import { LeftChevron } from "@/assets/icons/left-chevron";
import { useIsMobile } from "@/hooks/checkIsMobile";
import { useAuth } from "@/hooks/useAuth";
import { useImageUrl } from "@/hooks/useImageUrl";
import { useUser } from "@/hooks/useUser";
import useNavigationTracker from "@/hooks/useNavigationTracker";

export default function DashHeader() {
	const { user } = useUser();
	const { logout } = useAuth();
	const navigate = useNavigate();
	const isMobile = useIsMobile();

	const { clickCount, resetClickCount } = useNavigationTracker();

	// Return back on the previous page
	const handleBack = () => {
		navigate(-1);
	};

	// Logout and reset the counter that disabled the backButton when arrive on the dashboard
	const handleLogout = () => {
		logout();
		resetClickCount();
	};

	// Click count is to 1 if you come from the login to dashboard, it count to 1 click, after we activate the backButton
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
			)}
			<span className="dashHeader__right-corner">
				{isMobile && (
					<button
						onClick={handleLogout}
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
	);
}

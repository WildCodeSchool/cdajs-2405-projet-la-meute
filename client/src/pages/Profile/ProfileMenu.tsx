import Button from "@/components/_atoms/Button/Button";

export type ViewType = "profile" | "personal" | "account";

interface ProfileMenuProps {
	isTrainer: boolean;
	setView: (view: ViewType) => void;
}

function ProfileMenu({ isTrainer, setView }: ProfileMenuProps) {
	return (
		<nav className="profile__nav">
			<h3>Menu de mon profil</h3>
			<Button
				className="profile__nav--button"
				style="btn-dark"
				onClick={() => {
					setView("profile");
				}}
			>
				{isTrainer ? "Mon profil éducateur" : "Mon profil"}
			</Button>
			<Button
				className="profile__nav--button"
				style="btn-light"
				onClick={() => {
					setView("personal");
				}}
			>
				Informations personnelles
			</Button>
			<p>
				{isTrainer
					? "Modifiez les informations visibles par vos clients dans votre Profil Educateur et les informations non-visibles dans Informations personnelles."
					: "Modifiez les informations visibles par les éducateurs dans votre Profil et les informations non-visibles dans Informations personnelles."}
			</p>
		</nav>
	);
}

export default ProfileMenu;

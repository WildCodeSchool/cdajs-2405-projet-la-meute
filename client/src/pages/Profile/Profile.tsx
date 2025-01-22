import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";
import "./Profile.scss";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";

function Profile() {
	return (
		<>
			<PlanningHeader title="Mon profil" button={false} />
			<form className="profile">
				<span className="profile__title">
					<a className="dashHeader__avatar" href="/dashboard/my-profile">
						<img src="https://placehold.co/400" alt="avatar de l'utilisateur" />
					</a>
					<h2>firstname lastname</h2>
				</span>
				<span className="profile__names">
					<TextInput type="firstname" />
					<TextInput type="lastname" />
				</span>
				<TextInput type="city" />
				<p>
					Indiquez une adresse générale pour donner un périmètre à vos clients.
				</p>
				<TextInput type="description" inputType="textarea" />
				<Button className="profile__button" type="btn-dark">
					Sauvegarder le profil
				</Button>
			</form>
		</>
	);
}

export default Profile;

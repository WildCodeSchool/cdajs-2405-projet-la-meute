import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";
import "./Profile.scss";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import { useUser } from "@/hooks/useUser";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
	const { user } = useUser();
	const navigate = useNavigate();

	const firstnameRef = useRef<HTMLInputElement>(null);
	const lastnameRef = useRef<HTMLInputElement>(null);
	const cityRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (
			user &&
			firstnameRef.current &&
			lastnameRef.current &&
			cityRef.current &&
			descriptionRef.current
		) {
			firstnameRef.current.value = user.firstname || "";
			lastnameRef.current.value = user.lastname || "";
			cityRef.current.value = user.city || "";
			descriptionRef.current.value = user.description || "";
		} else {
			navigate("/login");
		}
	}, [user, navigate]);

	return (
		<>
			<PlanningHeader title="Mon profil" button={false} />
			<form className="profile">
				<span className="profile__title">
					<a className="dashHeader__avatar" href="/dashboard/my-profile">
						<img src={user?.avatar} alt="avatar de l'utilisateur" />
					</a>
					<h2>
						{user?.firstname} {user?.lastname}
					</h2>
				</span>
				<span className="profile__names">
					<TextInput color="light" type="firstname" ref={firstnameRef} />
					<TextInput color="light" type="lastname" ref={lastnameRef} />
				</span>
				<TextInput color="light" type="city" ref={cityRef} />
				<p>
					Indiquez une adresse générale pour donner un périmètre à vos clients.
				</p>
				<TextInput
					color="light"
					type="description"
					inputType="textarea"
					ref={descriptionRef}
				/>
				<Button className="profile__button" type="btn-dark">
					Sauvegarder le profil
				</Button>
			</form>
		</>
	);
}

export default Profile;

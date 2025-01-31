import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";
import "./Profile.scss";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import { useUser } from "@/hooks/useUser";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/graphQL/mutations/user";

function Profile() {
	const { user } = useUser();
	const navigate = useNavigate();

	const firstnameRef = useRef<HTMLInputElement>(null);
	const lastnameRef = useRef<HTMLInputElement>(null);
	const cityRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	const [updateUserMutation] = useMutation(UPDATE_USER);

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

	const handleUpdateFormSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();

		const updatedUser = {
			id: Number(user?.id),
			role: user?.role,
			firstname: firstnameRef.current?.value,
			lastname: lastnameRef.current?.value,
			city: cityRef.current?.value,
			description: descriptionRef.current?.value,
		};

		try {
			const response = await updateUserMutation({
				variables: { updatedUser },
			});

			if (response.data.UpdateUser.message === "User updated successfully") {
				alert("Profil sauvegardé avec succès !");
			} else if (response.data.UpdateUser.message === "User not found") {
				alert("Utilisateur non trouvé.");
			} else if (
				response.data.UpdateUser.message === "There was no field to update"
			) {
				alert("Aucun champ à mettre à jour.");
			} else {
				alert("Erreur lors de la mise à jour du profil.");
			}
		} catch (error) {
			console.error("Erreur lors de la sauvegarde :", error);
			alert("Une erreur est survenue lors de la sauvegarde.");
		}
	};

	return (
		<>
			<PlanningHeader title="Mon profil" button={false} />
			<form className="profile__form" onSubmit={handleUpdateFormSubmit}>
				<span className="profile__form--title">
					<a className="dashHeader__avatar" href="/dashboard/my-profile">
						<img src={user?.avatar} alt="avatar de l'utilisateur" />
					</a>
					<h2>
						{user?.firstname} {user?.lastname}
					</h2>
				</span>
				<span className="profile__form--names">
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
				<Button
					className="profile__form--button"
					type="submit"
					style="btn-dark"
				>
					Sauvegarder le profil
				</Button>
			</form>
			<nav className="profile__menu">
				<h3>Menu de mon profil</h3>
				<Button
					className="profile__menu--button"
					style="btn-dark"
					href="/dashboard/my-profile"
				>
					Mon profil éducateur
				</Button>
				<Button
					className="profile__menu--button"
					style="btn-light"
					href="/dashboard/my-profile"
				>
					Informations personnelles
				</Button>
				<p>
					Modifiez les informations visibles par vos clients dans votre Profil
					Educateur et les informations non-visibles dans Informations
					personnelles.
				</p>
			</nav>
		</>
	);
}

export default Profile;

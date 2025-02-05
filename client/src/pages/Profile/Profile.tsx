import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";
import "./Profile.scss";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import { useUser } from "@/hooks/useUser";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/graphQL/mutations/user";

function Profile() {
	const { user, refetch } = useUser();
	const navigate = useNavigate();
	const [view, setView] = useState<"profile" | "personal" | "preferences">(
		"profile",
	);

	const firstnameRef = useRef<HTMLInputElement>(null);
	const lastnameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const phoneRef = useRef<HTMLInputElement>(null);
	const cityRef = useRef<HTMLInputElement>(null);
	const siretRef = useRef<HTMLInputElement>(null);
	const companyNameRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	const [updateUserMutation] = useMutation(UPDATE_USER);

	useEffect(() => {
		if (!user) {
			navigate("/login");
			return;
		}

		if (view === "profile") {
			if (firstnameRef.current)
				firstnameRef.current.value = user.firstname || "";
			if (lastnameRef.current) lastnameRef.current.value = user.lastname || "";
			if (cityRef.current) cityRef.current.value = user.city || "";
			if (descriptionRef.current)
				descriptionRef.current.value = user.description || "";
		}

		if (view === "personal") {
			if (emailRef.current) emailRef.current.value = user.email || "";
			if (phoneRef.current) phoneRef.current.value = user.phone_number || "";
			if (siretRef.current) siretRef.current.value = user.siret || "";
			if (companyNameRef.current)
				companyNameRef.current.value = user.company_name || "";
		}
	}, [user, navigate, view]);

	const handleUpdateFormSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();

		let updatedUser = {};

		if (view === "profile") {
			updatedUser = {
				id: Number(user?.id),
				role: user?.role,
				firstname: firstnameRef.current?.value,
				lastname: lastnameRef.current?.value,
				city: cityRef.current?.value,
				description: descriptionRef.current?.value,
			};
		} else {
			updatedUser = {
				id: Number(user?.id),
				role: user?.role,
				email: emailRef.current?.value,
				phone_number: phoneRef.current?.value,
				siret: siretRef.current?.value,
				company_name: companyNameRef.current?.value,
			};
		}

		try {
			const response = await updateUserMutation({
				variables: { updatedUser },
			});
			if (response.data.UpdateUser.message === "User updated successfully") {
				alert("Profil sauvegardé avec succès !");
				await refetch();
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
			alert("Une erreur est survenue lors de la sauvegarde.");
		}
	};

	return (
		<>
			<PlanningHeader title="Mon profil" button={false} />

			<main className="profile">
				<nav className="profile__nav">
					<h3>Menu de mon profil</h3>
					<Button
						className="profile__nav--button"
						style="btn-dark"
						onClick={() => {
							setView("profile");
						}}
					>
						Mon profil éducateur
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
						Modifiez les informations visibles par vos clients dans votre Profil
						Educateur et les informations non-visibles dans Informations
						personnelles.
					</p>
				</nav>

				<form className="profile__form" onSubmit={handleUpdateFormSubmit}>
					<span className="profile__form--title">
						<a className="dashHeader__avatar" href="/dashboard/my-profile">
							<img src={user?.avatar} alt="avatar de l'utilisateur" />
						</a>
						<h2>
							{user?.firstname} {user?.lastname}
						</h2>
					</span>
					{view === "profile" && (
						<>
							<span className="profile__form--names">
								<TextInput style="light" type="firstname" ref={firstnameRef} />
								<TextInput style="light" type="lastname" ref={lastnameRef} />
							</span>
							<TextInput style="light" type="city" ref={cityRef} />
							<p>
								Indiquez une adresse générale pour donner un périmètre à vos
								clients.
							</p>
							<TextInput
								style="light"
								type="description"
								inputType="textarea"
								ref={descriptionRef}
							/>
						</>
					)}
					{view === "personal" && (
						<>
							<TextInput style="light" type="email" ref={emailRef} />
							<TextInput style="light" type="telephone" ref={phoneRef} />
							<TextInput style="light" type="SIRET" ref={siretRef} />
							<TextInput
								style="light"
								type="company_name"
								ref={companyNameRef}
							/>
						</>
					)}
					<Button
						className="profile__form--button"
						type="submit"
						style="btn-dark"
					>
						Sauvegarder le profil
					</Button>
				</form>
			</main>
		</>
	);
}

export default Profile;

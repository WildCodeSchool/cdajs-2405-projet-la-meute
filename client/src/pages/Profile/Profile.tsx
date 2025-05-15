import "./Profile.scss";
import { toast } from "react-toastify";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/graphQL/mutations/user";
import { useUser } from "@/hooks/useUser";
import { useImageUrl } from "@/hooks/useImageUrl";
import { useForm } from "@/hooks/useForm";
import type { Trainer } from "@/types/User";

import Button from "@/components/_atoms/Button/Button";
import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";

import type { ViewType } from "./ProfileMenu";
import ProfileView from "./View/ProfileView";
import PersonalView from "./View/PersonalView";
import ProfileMenu from "./ProfileMenu";
import AccountManagementView from "./View/AccountManagementView";

export interface ProfileFormValues extends Record<string, unknown> {
	firstname: string;
	lastname: string;
	city: string;
	description: string;
	email: string;
	phone_number: string;
	siret: string;
	company_name: string;
}

function Profile() {
	const { role, user, refreshUser } = useUser();
	const [view, setView] = useState<ViewType>("profile");

	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const [updateUserMutation] = useMutation(UPDATE_USER);
	const isTrainer = role === "trainer";
	const accountView = view === "account";

	const initialTrainerFields =
		isTrainer && user
			? {
					siret: (user as Trainer).siret || "",
					company_name: (user as Trainer).company_name || "",
				}
			: {
					siret: "",
					company_name: "",
				};

	const form = useForm<ProfileFormValues>({
		initialValues: {
			firstname: user?.firstname || "",
			lastname: user?.lastname || "",
			city: user?.city || "",
			description: user?.description || "",
			email: user?.email || "",
			phone_number: user?.phone_number || "",
			...initialTrainerFields,
		},
		onSubmit: async (formValues) => {
			await handleUpdateFormSubmit(formValues);
		},
	});

	const handleUpdateFormSubmit = async (formValues: ProfileFormValues) => {
		let updatedUser = {};

		if (view === "profile") {
			updatedUser = {
				id: Number(user?.id),
				role: user?.role,
				avatar: selectedFile,
				firstname: formValues.firstname,
				lastname: formValues.lastname,
				city: formValues.city,
				description: formValues.description,
			};
		} else {
			updatedUser = {
				id: Number(user?.id),
				role: user?.role,
				email: formValues.email,
				phone_number: formValues.phone_number,
				siret: formValues.siret,
				company_name: formValues.company_name,
			};
		}

		try {
			const response = await updateUserMutation({
				variables: {
					updatedUser,
					isTrainer: isTrainer,
				},
			});
			if (response.data.UpdateUser.message === "User updated successfully") {
				toast.success("Profil sauvegardé avec succès !");
				refreshUser();
			} else if (response.data.UpdateUser.message === "User not found") {
				toast.error("Utilisateur non trouvé.");
			} else if (
				response.data.UpdateUser.message === "There was no field to update"
			) {
				toast.warning("Aucun champ à mettre à jour.");
			} else {
				toast.error("Erreur lors de la mise à jour du profil.");
			}
		} catch (error) {
			toast.error("Une erreur est survenue lors de la sauvegarde.");
		}
	};

	return (
		<>
			<PlanningHeader title="Mon profil" />

			<main className="profile">
				<ProfileMenu isTrainer={isTrainer} setView={setView} />

				{!accountView && (
					<form className="profile__form" onSubmit={form.handleSubmit}>
						<span className="profile__form--title">
							<img
								src={
									previewUrl
										? previewUrl
										: user?.avatar
											? useImageUrl(user?.avatar)
											: useImageUrl("/upload/images/defaultuserprofile.jpg")
								}
								alt="avatar de l'utilisateur"
							/>

							<h2>
								{user?.firstname} {user?.lastname}
							</h2>
						</span>
						{view === "profile" && (
							<ProfileView
								form={form}
								isTrainer={isTrainer}
								setPreviewUrl={setPreviewUrl}
								selectedFile={selectedFile}
								setSelectedFile={setSelectedFile}
							/>
						)}
						{view === "personal" && (
							<PersonalView form={form} isTrainer={isTrainer} />
						)}
						<Button
							className="profile__form--button"
							type="submit"
							style="btn-dark"
						>
							Sauvegarder le profil
						</Button>
					</form>
				)}

				{accountView && <AccountManagementView />}
			</main>
		</>
	);
}

export default Profile;

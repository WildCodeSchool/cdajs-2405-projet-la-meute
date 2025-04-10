import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";
import "./Profile.scss";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import FileInput from "@/components/_atoms/Inputs/FileInputs/FileInput";
import Button from "@/components/_atoms/Button/Button";
import Modal from "@/components/_molecules/Modal/Modal";
import { toast } from "react-toastify";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/graphQL/mutations/user";
import { useImageUrl } from "@/hooks/useImageUrl";
import { useForm } from "@/hooks/useForm";
import type { Trainer } from "@/types/User";

interface ProfileFormValues extends Record<string, unknown> {
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
	const { role, user, refetch } = useUser();
	const [view, setView] = useState<"profile" | "personal" | "preferences">(
		"profile",
	);

	const [confirmModal, setConfirmModal] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [tempFile, setTempFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const [updateUserMutation] = useMutation(UPDATE_USER);
	const isTrainer = role === "trainer";

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

	useEffect(() => {
		if (selectedFile) {
			const objectUrl = URL.createObjectURL(selectedFile);
			setPreviewUrl(objectUrl);
			return () => URL.revokeObjectURL(objectUrl);
		}
		setPreviewUrl(null);
	}, [selectedFile]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setTempFile(file);
			setConfirmModal(true);
		} else {
			setTempFile(null);
		}
	};

	const confirmFileSelection = () => {
		setSelectedFile(tempFile);
		setConfirmModal(false);
	};

	const cancelFileSelection = () => {
		setTempFile(null);
		setConfirmModal(false);
		const fileInput = document.querySelector(
			'input[type="file"]',
		) as HTMLInputElement;
		if (fileInput) {
			fileInput.value = "";
		}
	};

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
				refetch();
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
						<>
							<FileInput
								label="Photo de profil"
								accept="image/*"
								onChange={handleFileChange}
							/>
							<span className="profile__form--names">
								<TextInput
									style="light"
									type="firstname"
									name="firstname"
									value={form.values.firstname}
									onChange={form.handleChange}
								/>
								<TextInput
									style="light"
									type="lastname"
									name="lastname"
									value={form.values.lastname}
									onChange={form.handleChange}
								/>
							</span>
							<TextInput
								style="light"
								type="city"
								name="city"
								value={form.values.city}
								onChange={form.handleChange}
							/>
							{isTrainer && (
								<p>
									Indiquez une adresse générale pour donner un périmètre à vos
									clients.
								</p>
							)}
							<TextInput
								style="light"
								type="description"
								inputType="textarea"
								name="description"
								value={form.values.description}
								onChange={form.handleChange}
							/>
						</>
					)}
					{view === "personal" && (
						<>
							<TextInput
								style="light"
								type="email"
								name="email"
								value={form.values.email}
								onChange={form.handleChange}
							/>
							<TextInput
								style="light"
								type="telephone"
								name="phone_number"
								value={form.values.phone_number}
								onChange={form.handleChange}
							/>
							{isTrainer && (
								<>
									<TextInput
										style="light"
										type="SIRET"
										name="siret"
										value={form.values.siret}
										onChange={form.handleChange}
									/>
									<TextInput
										style="light"
										type="company_name"
										name="company_name"
										value={form.values.company_name}
										onChange={form.handleChange}
									/>
								</>
							)}
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
				<Modal
					type="info"
					isOpen={confirmModal}
					onClose={cancelFileSelection}
					filePreview={tempFile}
				>
					<p>Voulez-vous utiliser cette image comme avatar ?</p>
					<Button onClick={confirmFileSelection} style="btn-dark">
						Confirmer
					</Button>
				</Modal>
			</main>
		</>
	);
}

export default Profile;

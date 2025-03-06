import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";
import "./Profile.scss";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import FileInput from "@/components/_atoms/Inputs/FileInputs/FileInput";
import Button from "@/components/_atoms/Button/Button";
import Modal from "@/components/_molecules/Modal/Modal";
import { toast } from "react-toastify";
import { useUser } from "@/hooks/useUser";
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/graphQL/mutations/user";

function Profile() {
	const { role, user, refetch } = useUser();
	const navigate = useNavigate();
	const [view, setView] = useState<"profile" | "personal" | "preferences">(
		"profile",
	);

	const avatarRef = useRef<HTMLInputElement>(null);
	const firstnameRef = useRef<HTMLInputElement>(null);
	const lastnameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const phoneRef = useRef<HTMLInputElement>(null);
	const cityRef = useRef<HTMLInputElement>(null);
	const siretRef = useRef<HTMLInputElement>(null);
	const companyNameRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);

	const [confirmModal, setConfirmModal] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [tempFile, setTempFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const [updateUserMutation] = useMutation(UPDATE_USER);
	const isTrainer = role === "trainer";

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
			if (siretRef.current && user.role === "trainer")
				siretRef.current.value = user.siret || "";
			if (companyNameRef.current && user.role === "trainer")
				companyNameRef.current.value = user.company_name || "";
		}
	}, [user, navigate, view]);

	useEffect(() => {
		if (selectedFile) {
			const objectUrl = URL.createObjectURL(selectedFile);
			setPreviewUrl(objectUrl);
			return () => URL.revokeObjectURL(objectUrl);
		}
		setPreviewUrl(null);
	}, [selectedFile]);

	const handleUpdateFormSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();

		let updatedUser = {};

		if (view === "profile") {
			updatedUser = {
				id: Number(user?.id),
				role: user?.role,
				avatar: selectedFile,
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
		if (avatarRef.current) {
			avatarRef.current.value = "";
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

				<form className="profile__form" onSubmit={handleUpdateFormSubmit}>
					<span className="profile__form--title">
						<img
							src={
								previewUrl
									? previewUrl
									: user?.avatar
										? `${import.meta.env.VITE_API_URL}${user?.avatar}`
										: `${import.meta.env.VITE_API_URL}/upload/images/defaultuserprofile.jpg`
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
								ref={avatarRef}
								label="Photo de profil"
								accept="image/*"
								onChange={handleFileChange}
							/>
							<span className="profile__form--names">
								<TextInput style="light" type="firstname" ref={firstnameRef} />
								<TextInput style="light" type="lastname" ref={lastnameRef} />
							</span>
							<TextInput style="light" type="city" ref={cityRef} />
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
								ref={descriptionRef}
							/>
						</>
					)}
					{view === "personal" && (
						<>
							<TextInput style="light" type="email" ref={emailRef} />
							<TextInput style="light" type="telephone" ref={phoneRef} />
							{isTrainer && (
								<>
									<TextInput style="light" type="SIRET" ref={siretRef} />
									<TextInput
										style="light"
										type="company_name"
										ref={companyNameRef}
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

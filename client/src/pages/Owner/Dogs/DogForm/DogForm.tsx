import "./DogForm.scss";
import { useEffect, useState } from "react";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import FileInput from "@/components/_atoms/Inputs/FileInputs/FileInput";
import Button from "@/components/_atoms/Button/Button";
import Modal from "@/components/_molecules/Modal/Modal";
import type { Dog } from "@/types/Dog";
import { useMutation } from "@apollo/client";
import { useUser } from "@/hooks/useUser";
import { useForm } from "@/hooks/useForm";
import { useNavigate } from "react-router-dom";
import { CREATE_DOG, UPDATE_DOG } from "@/graphQL/mutations/dog";
import { useImageUrl } from "@/hooks/useImageUrl";
import { toast } from "react-toastify";

interface DogFormProps {
	mode: "create" | "update";
	initialData?: Dog | null;
}

interface DogFormValues extends Record<string, unknown> {
	name: string;
	breed: string;
	birthDate: string;
	info: string;
}

export default function DogForm({
	mode = "create",
	initialData = null,
}: DogFormProps) {
	const [confirmModal, setConfirmModal] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [tempFile, setTempFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const { user } = useUser();
	const navigate = useNavigate();

	const form = useForm<DogFormValues>({
		initialValues: {
			name: initialData?.name || "",
			breed: initialData?.breed || "",
			birthDate: initialData?.birthDate
				? new Date(initialData.birthDate).toISOString().split("T")[0]
				: "",
			info: initialData?.info || "",
		},
		onSubmit: async (formValues) => {
			if (!formValues.name.trim()) {
				toast.error("Le nom de votre chien est requis");
				return;
			}

			await handleSubmit(formValues);
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

	const query = mode === "create" ? CREATE_DOG : UPDATE_DOG;
	const [selectedQuery] = useMutation(query);
	const formTitle =
		mode === "create" ? "Ajout d'un chien" : `Profil de ${initialData?.name}`;
	const formSubtitle =
		mode === "create"
			? "Renseignez les informations de votre nouveau compagnon"
			: "Vous pouvez ici changer toutes les informations liées à votre compagnon";
	const buttonText =
		mode === "create"
			? "Valider l'ajout de mon nouveau chien"
			: "Sauvegarder les modifications";

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
	};

	const handleSubmit = async (formValues: DogFormValues) => {
		try {
			const birthDate = formValues.birthDate
				? new Date(formValues.birthDate).toISOString()
				: undefined;

			const variables = {
				ownerId: Number(user?.id),
				name: formValues.name,
				breed: formValues.breed,
				birthDate,
				info: formValues.info,
				picture: selectedFile,
				...(mode === "update" && { dogId: Number(initialData?.id) }),
			};

			await selectedQuery({
				variables,
			});

			const message =
				mode === "create"
					? `Votre chien ${variables.name} a été ajouté avec succès !`
					: `Les modifications de ${variables.name} ont été enregistrées avec succès !`;

			sessionStorage.setItem("dogAlert", message);
			navigate("/owner/my-dogs");
		} catch (error) {
			console.error("Error saving dog:", error);
		}
	};

	return (
		<main className="dogForm">
			<form className="dogForm__form" onSubmit={form.handleSubmit}>
				<div className="dogForm__form__title">
					<img
						src={
							previewUrl
								? previewUrl
								: initialData?.picture
									? useImageUrl(initialData.picture)
									: useImageUrl("/upload/images/defaultdog.jpg")
						}
						alt={mode === "create" ? "votre chien" : `${initialData?.name}`}
						className="dogForm__form__title--picture"
					/>
					<div className="dogForm__form__title--intro">
						<h3>{formTitle}</h3>
						<p>{formSubtitle}</p>
					</div>
				</div>
				<FileInput
					label="Photo de votre chien"
					accept="image/*"
					onChange={handleFileChange}
				/>
				<TextInput
					type="name"
					name="name"
					value={form.values.name}
					onChange={form.handleChange}
				/>
				<TextInput
					type="breed"
					name="breed"
					value={form.values.breed}
					onChange={form.handleChange}
				/>
				<TextInput
					type="birthDate"
					inputType="date"
					name="birthDate"
					value={form.values.birthDate}
					onChange={form.handleChange}
				/>
				<TextInput
					type="info"
					inputType="textarea"
					name="info"
					value={form.values.info}
					onChange={form.handleChange}
					className="dogForm__form__description"
				/>
				<span className="dogForm__button">
					<Button
						type="submit"
						style={{ type: "thin-btn-light", color: "orange" }}
					>
						{buttonText}
					</Button>
				</span>
			</form>
			<Modal
				type="info"
				isOpen={confirmModal}
				onClose={cancelFileSelection}
				filePreview={tempFile}
			>
				<p>
					Voulez-vous utiliser cette image comme photo pour{" "}
					{mode === "create" ? "votre chien" : `${initialData?.name}`} ?
				</p>
				<Button onClick={confirmFileSelection} style="btn-dark">
					Confirmer
				</Button>
			</Modal>
		</main>
	);
}

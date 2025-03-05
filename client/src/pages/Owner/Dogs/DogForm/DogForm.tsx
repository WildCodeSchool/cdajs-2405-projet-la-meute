import "./DogForm.scss";
import { useRef, useEffect, useState } from "react";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import FileInput from "@/components/_atoms/Inputs/FileInputs/FileInput";
import Button from "@/components/_atoms/Button/Button";
import Modal from "@/components/_molecules/Modal/Modal";
import type { Dog } from "@/types/Dog";
import { useMutation } from "@apollo/client";
import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { CREATE_DOG, UPDATE_DOG } from "@/graphQL/mutations/dogs";

interface DogFormProps {
	mode: "create" | "update";
	initialData?: Dog | null;
}

export default function DogForm({
	mode = "create",
	initialData = null,
}: DogFormProps) {
	const pictureRef = useRef<HTMLInputElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);
	const breedRef = useRef<HTMLInputElement>(null);
	const birthDateRef = useRef<HTMLInputElement>(null);
	const infoRef = useRef<HTMLTextAreaElement>(null);

	const [confirmModal, setConfirmModal] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [tempFile, setTempFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const { user } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		let isComponentMounted = true;

		if (initialData && isComponentMounted) {
			if (nameRef.current instanceof HTMLInputElement) {
				nameRef.current.value = initialData.name || "";
			}
			if (breedRef.current instanceof HTMLInputElement) {
				breedRef.current.value = initialData.breed || "";
			}
			if (birthDateRef.current instanceof HTMLInputElement) {
				birthDateRef.current.value = initialData.birthDate
					? new Date(initialData.birthDate).toISOString().split("T")[0]
					: "";
			}
			if (infoRef.current instanceof HTMLTextAreaElement) {
				infoRef.current.value = initialData.info || "";
			}
			if (pictureRef.current instanceof HTMLInputElement) {
				pictureRef.current.value = "";
			}
		}

		return () => {
			isComponentMounted = false;
		};
	}, [initialData]);

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
		if (pictureRef.current) {
			pictureRef.current.value = "";
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const birthDate = birthDateRef.current?.value
				? new Date(birthDateRef.current.value).toISOString()
				: undefined;

			const variables = {
				ownerId: Number(user?.id),
				name: nameRef.current?.value,
				breed: breedRef.current?.value,
				birthDate,
				info: infoRef.current?.value,
				picture: selectedFile,
				...(mode === "update" && { dogId: Number(initialData?.id) }),
			};

			await selectedQuery({
				variables,
			});

			const message =
				mode === "create"
					? `Votre chien ${variables.name} a été ajouté avec succès !`
					: `Les modificationsd de ${variables.name} ont été enregistrées avec succès !`;

			sessionStorage.setItem("dogAlert", message);
			navigate("/owner/my-dogs");
		} catch (error) {
			console.error("Error saving dog:", error);
		}
	};

	return (
		<main className="dogForm">
			<form className="dogForm__form" onSubmit={handleSubmit}>
				<div className="dogForm__form__title">
					<img
						src={
							previewUrl
								? previewUrl
								: initialData?.picture
									? `${import.meta.env.VITE_API_URL}${initialData.picture}`
									: `${import.meta.env.VITE_API_URL}/upload/images/defaultdog.jpg`
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
					ref={pictureRef}
					label="Photo de votre chien"
					accept="image/*"
					onChange={handleFileChange}
				/>
				<TextInput type="name" ref={nameRef} />
				<TextInput type="breed" ref={breedRef} />
				<TextInput type="birthDate" ref={birthDateRef} inputType="date" />
				<TextInput
					type="info"
					inputType="textarea"
					ref={infoRef}
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

import "./DogForm.scss";
import { useRef, useEffect } from "react";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import type { Dog } from "@/types/Dog";
import { useFileUpload } from "@/hooks/useFileUpload";
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
	const { handleChange, selectedFile } = useFileUpload();
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

	const query = mode === "create" ? CREATE_DOG : UPDATE_DOG;
	const [selectedQuery] = useMutation(query);
	const formTitle =
		mode === "create" ? "Ajout d'un chien" : "Profil de mon chien";
	const formSubtitle =
		mode === "create"
			? "Renseignez les informations de votre nouveau compagnon"
			: "Vous pouvez ici changer toutes les informations liées à votre compagnon";
	const buttonText =
		mode === "create"
			? "Valider l'ajout de mon nouveau chien"
			: "Sauvegarder les modifications";

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
					? "Votre chien a été ajouté avec succès !"
					: "Les modifications ont été enregistrées avec succès !";

			navigate("/owner/my-dogs", { state: { message: `${message}` } });
		} catch (error) {
			console.error("Error saving dog:", error);
		}
	};

	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			pictureRef.current?.click();
		}
	};

	return (
		<main className="dogForm">
			<form className="dogForm__form" onSubmit={handleSubmit}>
				<div>
					<div className="dogForm__form__title">
						<div
							className="dogForm__form__title--upload"
							onClick={() => pictureRef.current?.click()}
							onKeyDown={handleKeyPress}
							role="button"
							tabIndex={0}
						>
							<input
								type="file"
								onChange={handleChange}
								accept="image/*"
								ref={pictureRef}
							/>
						</div>
						<div className="dogForm__form__title--intro">
							<h3>{formTitle}</h3>
							<p>{formSubtitle}</p>
						</div>
					</div>
					<TextInput type="name" ref={nameRef} />
				</div>
				<TextInput type="breed" ref={breedRef} />
				<TextInput type="birthDate" ref={birthDateRef} inputType="date" />
				<TextInput type="info" inputType="textarea" ref={infoRef} />
				<span className="dogForm__button">
					<Button type="submit" style="thin-btn-light">
						{buttonText}
					</Button>
				</span>
			</form>
		</main>
	);
}

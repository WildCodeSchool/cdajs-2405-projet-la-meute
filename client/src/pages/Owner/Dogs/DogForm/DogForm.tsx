import "./DogForm.scss";
import { useRef, useEffect } from "react";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import type { Dog } from "@/types/Dog";

interface dogFormProps {
	mode: "create" | "update";
	initialData?: Dog | null;
}

export default function DogForm({
	mode = "create",
	initialData = null,
}: dogFormProps) {
	const pictureRef = useRef<HTMLInputElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);
	const breedRef = useRef<HTMLInputElement>(null);
	const ageRef = useRef<HTMLInputElement>(null);
	const infoRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (initialData) {
			if (nameRef.current) nameRef.current.value = initialData.name || "";
			if (breedRef.current) breedRef.current.value = initialData.breed || "";
			if (ageRef.current)
				ageRef.current.value = (initialData.getAge || "0").toString();
			if (infoRef.current) infoRef.current.value = initialData.info || "";
			if (pictureRef.current)
				pictureRef.current.value = initialData.picture || "";
		}
	}, [initialData]);

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

	return (
		<main className="dogForm">
			<form className="dogForm__form">
				<div>
					<div className="dogForm__form__title">
						<div className="dogForm__form__title--upload">{/* Upload */}</div>
						<div className="dogForm__form__title--intro">
							<h3>{formTitle}</h3>
							<p>{formSubtitle}</p>
						</div>
					</div>
					<TextInput type="name" ref={nameRef} />
				</div>
				<TextInput type="breed" ref={breedRef} />
				<TextInput type="age" ref={ageRef} inputType="number" min={0} />
				<TextInput type="info" inputType="textarea" ref={infoRef} />
				<span className="dogForm__button">
					<Button href="/owner/my-dogs" style="thin-btn-light">
						{buttonText}
					</Button>
				</span>
			</form>
		</main>
	);
}

import React, { useState, useRef, useImperativeHandle } from "react";
import { Eye } from "@/assets/icons/eye.tsx";
import { EyeOff } from "@/assets/icons/eye-off.tsx";
import "./TextInput.scss";

type TextInputTypes =
	| "email"
	| "password"
	| "lastname"
	| "firstname"
	| "city"
	| "postal_code"
	| "SIRET"
	| "company_name"
	| "telephone"
	| "description";

const TEXT_INPUT_CONFIG: Record<
	TextInputTypes,
	{ label: string; placeholder: string }
> = {
	email: {
		label: "Email",
		placeholder: "Entrez votre email",
	},
	password: {
		label: "Mot de passe",
		placeholder: "Entrez votre mot de passe",
	},
	lastname: {
		label: "Nom",
		placeholder: "Entrez votre nom",
	},
	firstname: {
		label: "Prénom",
		placeholder: "Entrez votre prénom",
	},
	city: {
		label: "Ville",
		placeholder: "Entrez votre ville",
	},
	postal_code: {
		label: "Code Postal",
		placeholder: "Entrez votre code postal",
	},
	SIRET: {
		label: "SIRET",
		placeholder: "Entrez votre SIRET",
	},
	company_name: {
		label: "Nom de l'entreprise",
		placeholder: "Entrez le nom de votre entreprise",
	},
	telephone: {
		label: "Numéro de téléphone",
		placeholder: "Entrez votre numéro de téléphone",
	},
	description: {
		label: "Description",
		placeholder: "Entrez votre description",
	},
};

const TextInput = React.forwardRef<
	HTMLInputElement | HTMLTextAreaElement,
	{
		type: TextInputTypes;
		required?: boolean;
		inputType?: "input" | "textarea";
		color?: "dark" | "light";
	}
>(({ type, required, inputType = "input", color = "light" }, ref) => {
	const [showPassword, setShowPassword] = useState(false);

	const { label, placeholder } = TEXT_INPUT_CONFIG[type];
	const fieldRequired = required ? " *" : "";

	// Dynamic ref based on inputType
	const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
	useImperativeHandle(ref, () => inputRef.current!);

	const inputId = `textInput-${type}`; // Unique ID for the input

	return (
		<div className={`textInput textInput__${color}`}>
			<label htmlFor={inputId}>
				{label}
				{fieldRequired}
			</label>
			{inputType === "textarea" ? (
				<textarea
					id={inputId}
					ref={inputRef as React.RefObject<HTMLTextAreaElement>}
					placeholder={placeholder}
					required={required}
				/>
			) : (
				<input
					id={inputId}
					ref={inputRef as React.RefObject<HTMLInputElement>}
					type={
						type === "password" ? (showPassword ? "text" : "password") : type
					}
					placeholder={placeholder}
					required={required}
				/>
			)}
			{type === "password" && (
				<button
					type="button"
					onClick={(e) => {
						e.preventDefault();
						setShowPassword(!showPassword);
					}}
					className="password-toggle"
					aria-label={
						showPassword
							? "Masquer le mot de passe"
							: "Afficher le mot de passe"
					}
				>
					{showPassword ? (
						<EyeOff className="eyes" fill="none" />
					) : (
						<Eye className="eyes" fill="none" />
					)}
				</button>
			)}
		</div>
	);
});

export default TextInput;

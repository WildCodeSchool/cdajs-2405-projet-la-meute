import React, { useState, useRef, useImperativeHandle } from "react";
import { Eye } from "@/assets/icons/eye.tsx";
import { EyeOff } from "@/assets/icons/eye-off.tsx";
import "./TextInput.scss";

type TextInputTypes =
	| "email"
	| "password"
	| "confirmPassword"
	| "confirmPassword"
	| "lastname"
	| "firstname"
	| "city"
	| "postal_code"
	| "SIRET"
	| "company_name"
	| "telephone"
	| "description";

interface TextInputProps {
	type: TextInputTypes;
	required?: boolean;
	passwordRef?: React.RefObject<HTMLInputElement>;
	isLogin?: boolean;
	inputType?: "input" | "textarea";
	style?: "dark" | "light";
}

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
	confirmPassword: {
		label: "Confirmation mot de passe",
		placeholder: "Confirmer le mot de passe",
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

// forwardRef allows us to use useRef in the component calling this one
const TextInput = React.forwardRef<
	HTMLInputElement | HTMLTextAreaElement,
	TextInputProps
>(
	(
		{
			type,
			required,
			inputType = "input",
			style = "light",
			passwordRef,
			isLogin,
		},
		ref,
	) => {
		const [showPassword, setShowPassword] = useState(false);
		const [error, setError] = useState<string>("");

		const { label, placeholder } = TEXT_INPUT_CONFIG[type];
		const fieldRequired = required ? " *" : "";
		const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
		useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

		const inputId = `textInput-${type}`;
		const isPasswordField = type === "password" || type === "confirmPassword";

		const validateInput = () => {
			if (isLogin) return;

			const value = inputRef.current?.value.trim() || "";
			let errorMessage = "";

			if (type === "email" && !/\S+@\S+\.\S+/.test(value)) {
				errorMessage = "Format d'email invalide.";
			} else if (type === "password" && value.length < 8) {
				errorMessage = "Le mot de passe doit contenir au moins 8 caractères.";
			} else if (
				type === "confirmPassword" &&
				passwordRef?.current &&
				passwordRef.current.value !== value
			) {
				errorMessage = "Les mots de passe ne correspondent pas.";
			}

			setError(errorMessage);
		};

		return (
			<div
				className={`textInput textInput__${style} ${!isLogin && error ? "has-error" : ""}`}
				data-error={error}
			>
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
						type={isPasswordField ? (showPassword ? "text" : "password") : type}
						placeholder={placeholder}
						required={required}
						onBlur={validateInput}
						className={error ? "error-border" : ""}
					/>
				)}
				{isPasswordField && (
					<button
						type="button"
						onMouseDown={(e) => {
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
	},
);

export default TextInput;

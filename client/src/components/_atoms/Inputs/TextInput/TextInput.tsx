import React, { useState, useRef, useImperativeHandle } from "react";
import { Eye } from "@/assets/icons/eye.tsx";
import { EyeOff } from "@/assets/icons/eye-off.tsx";
import "./TextInput.scss";

type TextInputTypes =
	| "email"
	| "password"
	| "confirmPassword"
	| "lastname"
	| "firstname"
	| "city"
	| "postal_code"
	| "SIRET"
	| "company_name"
	| "telephone"
	| "description"
	| "name"
	| "birthDate"
	| "breed"
	| "info";

interface TextInputProps {
	type?: TextInputTypes;
	required?: boolean;
	passwordRef?: React.RefObject<HTMLInputElement>;
	isLogin?: boolean;
	inputType?: "input" | "textarea" | "date";
	style?: "dark" | "light";
	label?: string;
	placeholder?: string;
	className?: string;
	name?: string;
	onChange?: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
}

const TEXT_INPUT_CONFIG: Record<
	TextInputTypes,
	{ mappedLabel: string; mappedPlaceholder: string; mappedName: string }
> = {
	email: {
		mappedLabel: "Email",
		mappedPlaceholder: "Entrez votre email",
		mappedName: "email",
	},
	password: {
		mappedLabel: "Mot de passe",
		mappedPlaceholder: "Entrez votre mot de passe",
		mappedName: "password",
	},
	confirmPassword: {
		mappedLabel: "Confirmation mot de passe",
		mappedPlaceholder: "Confirmer le mot de passe",
		mappedName: "confirmPassword",
	},
	lastname: {
		mappedLabel: "Nom",
		mappedPlaceholder: "Entrez votre nom",
		mappedName: "lastname",
	},
	firstname: {
		mappedLabel: "Prénom",
		mappedPlaceholder: "Entrez votre prénom",
		mappedName: "firstname",
	},
	city: {
		mappedLabel: "Ville",
		mappedPlaceholder: "Entrez votre ville",
		mappedName: "city",
	},
	postal_code: {
		mappedLabel: "Code Postal",
		mappedPlaceholder: "Entrez votre code postal",
		mappedName: "postal_code",
	},
	SIRET: {
		mappedLabel: "SIRET",
		mappedPlaceholder: "Entrez votre SIRET",
		mappedName: "SIRET",
	},
	company_name: {
		mappedLabel: "Nom de l'entreprise",
		mappedPlaceholder: "Entrez le nom de votre entreprise",
		mappedName: "company_name",
	},
	telephone: {
		mappedLabel: "Numéro de téléphone",
		mappedPlaceholder: "Entrez votre numéro de téléphone",
		mappedName: "telephone",
	},
	description: {
		mappedLabel: "Description",
		mappedPlaceholder: "Entrez votre description",
		mappedName: "description",
	},
	name: {
		mappedLabel: "Nom de mon chien",
		mappedPlaceholder: "Entrez le nom de votre chien",
		mappedName: "name",
	},
	birthDate: {
		mappedLabel: "Date de naissance de mon chien",
		mappedPlaceholder: "Sélectionnez la date de naissance",
		mappedName: "birthDate",
	},
	breed: {
		mappedLabel: "Race de mon chien",
		mappedPlaceholder: "Entrez la race de votre chien",
		mappedName: "breed",
	},
	info: {
		mappedLabel: "Informations complémentaires",
		mappedPlaceholder: "Entrez un commentaire sur votre chien",
		mappedName: "info",
	},
};

/** TextInput Component */
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
			label,
			placeholder,
			className,
			name,
			onChange,
		},
		ref,
	) => {
		const [showPassword, setShowPassword] = useState(false);
		const [error, setError] = useState<string>("");

		const {
			mappedLabel = label,
			mappedPlaceholder = placeholder,
			// mappedName = name,
		} = type ? TEXT_INPUT_CONFIG[type] : {};

		const fieldRequired = required ? " *" : "";
		const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
		useImperativeHandle(
			ref,
			() => inputRef.current as HTMLInputElement | HTMLTextAreaElement,
		);

		const inputId = `textInput-${type}`;
		const isPasswordField: boolean =
			type === "password" || type === "confirmPassword";

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
				className={`textInput ${className} textInput__${style} ${!isLogin && error ? "has-error" : ""}`}
				data-error={error}
			>
				<label htmlFor={inputId}>
					{mappedLabel}
					{fieldRequired}
				</label>
				{inputType === "textarea" ? (
					<textarea
						id={inputId}
						name={type ? TEXT_INPUT_CONFIG[type].mappedName : name}
						ref={inputRef as React.RefObject<HTMLTextAreaElement>}
						placeholder={mappedPlaceholder}
						required={required}
						onChange={onChange}
					/>
				) : (
					<input
						id={inputId}
						name={name || type}
						ref={inputRef as React.RefObject<HTMLInputElement>}
						type={
							isPasswordField
								? showPassword
									? "text"
									: "password"
								: inputType === "date"
									? "date"
									: "text"
						}
						placeholder={mappedPlaceholder}
						required={required}
						onBlur={validateInput}
						className={`${className} ${error ? "error-border" : ""}`}
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

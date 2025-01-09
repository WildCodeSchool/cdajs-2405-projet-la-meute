import React from "react";
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
	| "telephone";

// forwardRef allows us to use useRef in the component calling this one
const TextInput = React.forwardRef<
	HTMLInputElement,
	{ type: TextInputTypes; required?: boolean; widthInPercentage?: number }
>(({ type, required }, ref) => {
	let label = "";
	let placeholder = "";

	if (type === "email") {
		label = "Email";
		placeholder = "Entrez votre email";
	}
	if (type === "password") {
		label = "Mot de passe";
		placeholder = "Entrez votre mot de passe";
	}

	if (type === "lastname") {
		label = "Nom";
		placeholder = "Entrez votre nom";
	}

	if (type === "firstname") {
		label = "Prénom";
		placeholder = "Entrez votre prénom";
	}

	if (type === "city") {
		label = "Ville";
		placeholder = "Entrez votre ville";
	}

	if (type === "postal_code") {
		label = "Code Postal";
		placeholder = "Entrez votre code postal";
	}

	if (type === "SIRET") {
		label = "SIRET";
		placeholder = "Entrez votre SIRET";
	}

	if (type === "company_name") {
		label = "Nom de l'entreprise";
		placeholder = "Entrez le nom de votre entreprise";
	}

	if (type === "telephone") {
		label = "Numéro de téléphone";
		placeholder = "Entrez votre numéro de téléphone";
	}

	const fieldRequired = required ? " *" : "";

	return (
		<label className="textInput">
			{label}
			{fieldRequired}
			<input
				ref={ref}
				type={type}
				placeholder={placeholder}
				required={required}
			/>
		</label>
	);
});

export default TextInput;

import "./TextInput.scss";

type TextInputTypes = "email" | "password" | "name" | "firstname" | "city" | "postcode" | "SIRET" | "companyName" | "telephone";

export default function TextInput({ type, required }: { type: TextInputTypes; required?: boolean }) {
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

	if (type === "name") {
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

	if (type === "postcode") {
        label = "Code Postal";
        placeholder = "Entrez votre code postal";
    }

	if (type === "SIRET") {
		label = "SIRET";
		placeholder = "Entrez votre SIRET";
	}

	if (type === "companyName") {
		label = "Nom de l'entreprise";
		placeholder = "Entrez le nom de votre entreprise";
	}

    if (type === "telephone") {
        label = "Numéro de téléphone";
        placeholder = "Entrez votre numéro de téléphone";
    }

	const fieldRequired = required ? `${label} *` : label;

	return (
		<label className="textInput">
			{fieldRequired}
			<input type={type} placeholder={placeholder} required={required} />
		</label>
	);
}

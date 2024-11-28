import "./TextInput.scss";

type TextInputTypes = "email" | "password";

export default function TextInput({ type }: { type: TextInputTypes }) {
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

	return (
		<label className="textInput">
			{label}
			<input type={type} placeholder={placeholder} />
		</label>
	);
}

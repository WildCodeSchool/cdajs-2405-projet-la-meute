import React from "react";
import "./TextInput.scss";

type TextInputTypes = "email" | "password";

const TextInput = React.forwardRef<
	HTMLInputElement,
	{ type: TextInputTypes; required?: boolean }
>(({ type, required }, ref) => {
	let label = "";
	let placeholder = "";
	if (type === "email") {
		label = "Email";
		placeholder = "Entrez votre email";
	} else if (type === "password") {
		label = "Mot de passe";
		placeholder = "Entrez votre mot de passe";
	}

	return (
		<label className="textInput">
			{label}
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

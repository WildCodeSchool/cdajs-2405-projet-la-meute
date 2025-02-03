import Form from "@/components/_molecules/Form/Form";
import "./Login.scss";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import { useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { PASSWORDRESET } from "@/graphQL/mutations/user";

function NewPassword() {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);
	const [message, setMessage] = useState("");

	const [resetPassword, { loading }] = useMutation(PASSWORDRESET, {
		onCompleted: (data) => {
			if (data.PasswordReset.success) {
				window.location.href = "/login";
			}
			setMessage(data.PasswordReset.message);
		},
		onError: (error) => setMessage(error.message),
	});

	const onFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const password = passwordRef.current?.value;
		const confirmPassword = confirmPasswordRef.current?.value;

		if (!password || !confirmPassword) {
			setMessage("Tous les champs sont requis");
			return;
		}

		if (password !== confirmPassword) {
			setMessage("Les mots de passe ne correspondent pas");
			return;
		}

		if (password.length < 8) {
			setMessage("Le mot de passe doit faire au moins 8 caractères");
			return;
		}

		try {
			await resetPassword({
				variables: {
					token,
					newPassword: password,
				},
			});
		} catch (err) {
			console.error("Password reset error:", err);
		}
	};

	return (
		<main className="login">
			<Form
				className="login__form"
				title="Renseignez un nouveau mot de passe"
				onSubmit={onFormSubmit}
			>
				<p className="introductiveText">
					Ajoutez un nouveau mot de passe puis valider votre nouveau mot de
					passe.
				</p>
				<TextInput color="dark" type="password" ref={passwordRef} required />
				<TextInput
					color="dark"
					type="confirmPassword"
					ref={confirmPasswordRef}
					passwordRef={passwordRef}
					required
				/>
				{message && <p className="message">{message}</p>}
				<Button style="submit" type="submit" href="/login">
					{loading
						? "Validation en cours..."
						: "Valider mon nouveau mot de passe"}
				</Button>
			</Form>
		</main>
	);
}

export default NewPassword;

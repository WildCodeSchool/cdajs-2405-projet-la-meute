import Form from "@/components/_molecules/Form/Form";
import "./Login.scss";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { REQUESTPASSWORDRESET } from "@/graphQL/mutations/user";

function ResetPassword() {
	const emailRef = useRef<HTMLInputElement>(null);

	const [RequestPasswordReset, { loading }] = useMutation(
		REQUESTPASSWORDRESET,
		{
			onCompleted: (data) => {
				if (data.RequestPasswordReset.success) {
					window.location.href = "/reset-link";
				}
			},
			onError: (error) => {
				console.error("Login error:", error);
			},
		},
	);

	const onFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const email = emailRef.current?.value;

		try {
			await RequestPasswordReset({
				variables: { email },
			});
		} catch (err) {
			// TODO: handle error
			console.error("Login error:", err);
		}
	};

	return (
		<main className="login">
			<Form
				className="login__form"
				title="Mot de passe oublié ?"
				onSubmit={onFormSubmit}
			>
				<p className="introductiveText">
					Saisissez votre adresse e-mail et nous vous enverrons des instructions
					pour réinitialiser votre mot de passe.
				</p>
				<TextInput style="dark" type="email" ref={emailRef} required />
				<Button type="submit" style="submit">
					{loading ? "Envoi en cours..." : "Envoyer à cette adresse email"}
				</Button>
			</Form>
		</main>
	);
}

export default ResetPassword;

import "./Login.scss";
import Form from "@/components/_molecules/Form/Form";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import { useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const { login, loading } = useAuth();
	const [errorMessage, setErrorMessage] = useState<string>("");

	const onFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setErrorMessage("");

		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;

		if (!email || !password) {
			setErrorMessage("Veuillez remplir tous les champs");
			return;
		}

		const result = await login(email, password);

		if (!result.success && result.message) {
			setErrorMessage(result.message);
		}
	};

	if (loading) return <p>Loading...</p>;

	return (
		<main className="login">
			<Form
				className="login__form"
				title="Connectez-vous ici"
				onSubmit={onFormSubmit}
			>
				<TextInput type="email" ref={emailRef} style="dark" required isLogin />
				<TextInput
					type="password"
					ref={passwordRef}
					style="dark"
					required
					isLogin
				/>
				<Button style="submit" type="submit">
					Me connecter
				</Button>
				<p className="login__bottomLinks">
					Si vous avez oublié votre mot de passe{" "}
					<a href="/reset-password">cliquez ici</a>.
				</p>
				<p className="login__bottomLinks">
					Si vous n'êtes pas inscrit, vous pouvez{" "}
					<a href="/registration">vous inscrire ici</a>.
				</p>
				{errorMessage && <p className="login__errorMessage">{errorMessage}</p>}
			</Form>
		</main>
	);
}

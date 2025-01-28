import "./Login.scss";
import Form from "@/components/_molecules/Form/Form";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import { useRef } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const { login, loading, error } = useAuth();

	const onFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;

		if (!email || !password) {
			// TODO: handle error
			return;
		}

		login(email, password);
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<main className="login">
			<Form
				className="login__form"
				title="Connectez-vous ici"
				onSubmit={onFormSubmit}
			>
				<TextInput type="email" ref={emailRef} color="dark" required />
				<TextInput type="password" ref={passwordRef} color="dark" required />
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
			</Form>
		</main>
	);
}

import "./Login.scss";
import Form from "@/components/_molecules/Form/Form";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import Header from "@/layouts/WelcomePage/Header";
import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/graphQL/mutations/user";

export default function Login() {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [login, { data, loading, error }] = useMutation(LOGIN);

	const onFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;

		try {
			await login({
				variables: { email, password },
			});
		} catch (err) {
			console.error("Login error:", err);
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;
	if (data) {
		// Redirection ou autre traitement après succès
		console.info(data);
	}

	return (
		<>
			<Header />
			<main className="login">
				<Form
					className="login__form"
					title="Connectez-vous ici"
					onSubmit={onFormSubmit}
				>
					<TextInput type="email" ref={emailRef} required />
					<TextInput type="password" ref={passwordRef} required />
					<Button type="submit">Me connecter</Button>
					<p className="login__bottomLinks">
						Si vous avez oublié votre mot de passe <a href="/">cliquez ici</a>.
					</p>
					<p className="login__bottomLinks">
						Si vous n'êtes pas inscrit, vous pouvez{" "}
						<a href="/">vous inscrire ici</a>.
					</p>
				</Form>
			</main>
		</>
	);
}

import "./Login.scss";
import Form from "@/components/_molecules/Form/Form";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { Link } from "react-router-dom";

export default function Login() {
	const { login } = useAuth();
	const [errorMessage, setErrorMessage] = useState<string>("");

	const form = useForm({
		initialValues: { email: "", password: "" },
		onSubmit: async (values) => {
			if (!values.email || !values.password) {
				setErrorMessage("Veuillez remplir tous les champs");
				return;
			}

			const result = await login(values.email, values.password);
			if (!result.success && result.message) {
				setErrorMessage(result.message);
			}
		},
	});

	return (
		<main className="login">
			<Form
				className="login__form"
				title="Connectez-vous ici"
				onSubmit={form.handleSubmit}
			>
				<TextInput
					type="email"
					name="email"
					style="dark"
					required
					isLogin
					value={form.values.email}
					onChange={form.handleChange}
				/>

				<TextInput
					type="password"
					name="password"
					style="dark"
					required
					isLogin
					value={form.values.password}
					onChange={form.handleChange}
				/>
				<Button style="submit" type="submit">
					Me connecter
				</Button>
				<p className="login__bottomLinks">
					Si vous avez oublié votre mot de passe{" "}
					<Link to="/reset-password">cliquez ici</Link>.
				</p>
				<p className="login__bottomLinks">
					Si vous n'êtes pas inscrit, vous pouvez{" "}
					<Link to="/registration">vous inscrire ici</Link>.
				</p>
				{errorMessage && <p className="login__errorMessage">{errorMessage}</p>}
			</Form>
		</main>
	);
}

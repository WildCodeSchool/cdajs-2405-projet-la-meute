import Form from "@/components/_molecules/Form/Form";
import "./Login.scss";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import Header from "@/layouts/WelcomePage/Header";

function Login() {
	return (
		<>
			<Header />
				<main className="login">
					<Form className="login__form" title="Connectez-vous ici">
						<TextInput type="email" />
						<TextInput type="password" />
						<Button type="form-deny" href="">
							Retour
						</Button>
						<Button type="form-submit" href="/">
							Me connecter
						</Button>
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

export default Login;

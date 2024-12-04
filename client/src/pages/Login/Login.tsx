import Form from "@/components/_molecules/Form/Form";
import "./Login.scss";
import logo from "@/assets/logo/night-blue/symbol-aside/logo-pawplanner-symbol-aside-night-blue.svg";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";

function Login() {
	return (
		/**
		 * logo + titre paw planner
		 * formulaire
		 *     - email
		 *     - password
		 *     - bouton login
		 *     - deux lignes de plus
		 *          - oubli mot de passe
		 *          - inscription
		 * image ?
		 * */
		<main className="login">
			<img className="login__logo" src={logo} alt="logo paw planner" />
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
	);
}

export default Login;

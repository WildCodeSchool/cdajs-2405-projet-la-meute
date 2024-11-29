import Form from "@/components/_molecules/Form/Form";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import "./LoginForm.scss";

function LoginForm() {
	return (
		<Form title="Connectez-vous ici">
			<TextInput type="email" />
			<TextInput type="password" />
			<Button type="form-deny" href="">
				Annuler
			</Button>
			<Button type="form-submit" href="">
				Me connecter
			</Button>
			<p>
				Si vous avez oublié votre mot de passe <a href="/">cliquer ici</a>
			</p>
			<p>
				Si vous n’êtes pas inscrit vous pouvez ici faire votre{" "}
				<a href="/">inscription</a>
			</p>
		</Form>
	);
}

export default LoginForm;

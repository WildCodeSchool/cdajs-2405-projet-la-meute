import Form from "@/components/_molecules/Form/Form";
import "./Login.scss";

function ResetLink() {
	return (
		<main className="login">
			<Form className="login__form" title="Vérifiez votre adresse e-mail">
				<p className="introductiveText__emoji">✅</p>
				<p className="login__bottomLinks">
					Veuillez consulter votre adresse e-mail pour réinitialiser votre mot
					de passe en cliquant sur le lien.
				</p>
			</Form>
		</main>
	);
}

export default ResetLink;

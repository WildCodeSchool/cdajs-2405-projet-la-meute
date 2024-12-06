import { useState } from "react";
import Form from "@/components/_molecules/Form/Form";
import "./Registration.scss";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import Header from "@/layouts/WelcomePage/Header";

function Registration() {
	const [role, setRole] = useState<"trainer" | "owner" | null>(null);
	return (
		<>
			<Header />
			<main className="registration">

				{!role ? (
					<>
						<section className="registration__section--choice">
							<h2>Vous êtes ...</h2>
							<div className="registration__div--choice">
								<div className="registration__div--choice-left">
									<h3 className="registration__div--choice-title">🙋🏻‍♂️ Éducateur</h3>
									<Button type="role-select" onClick={() => setRole("trainer")}>
										Je suis éducateur•trice canin
									</Button>
								</div>
								<div className="registration__div--choice-right">
									<h3 className="registration__div--choice-title">🐶 Propriétaire</h3>
									<Button type="role-select" onClick={() => setRole("owner")}>
										Je suis un•e propriétaire de chien
									</Button>
								</div>
							</div>
						</section>
					</>
				) : (
					<Form className="registration__form" title="Inscription">
						{role === "trainer" && <TextInput type="SIRET" required />}

						{role === "trainer" && <TextInput type="companyName" required />}

						<TextInput type="lastname" required />
						<TextInput type="firstname" required />
						<TextInput type="email" required />
						<TextInput type="password" required />
						<TextInput type="city" required />
						<TextInput type="postcode" required />
						<TextInput type="telephone" />
						<input type="hidden" name="role" value={role} />

						<Button type="form-deny" href="/registration">
							Retour
						</Button>

						<Button type="submit">S'inscrire</Button>
							<p>
								Si vous avez déjà un compte vous pouvez{" "}
								<a href="/login"> vous connecter ici</a>.
							</p>
					</Form>
				)}
			</main>
		</>
	);
}

export default Registration;

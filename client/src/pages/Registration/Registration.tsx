import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "@/components/_molecules/Form/Form";
import "./Registration.scss";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";

function Registration() {
	const [role, setRole] = useState<"trainer" | "owner" | null>(null);

	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate("/login");
	};

	return (
		<main className="registration">
			{!role ? (
				<>
					<section className="registration__section--choice">
						<h2 className="homepage__title">Vous êtes ...</h2>
						<div className="registration__div--choice">
							<div className="registration__div--card">
								<h3 className="registration__div--choice-title">
									🙋🏻‍♂️&nbsp;Éducateur · rice
								</h3>
								<Button
									type="role-select-left"
									onClick={() => setRole("trainer")}
								>
									Je suis éducateur·trice canin·e
								</Button>
							</div>
							<div className="registration__div--card">
								<h3 className="registration__div--choice-title">
									🐶&nbsp;Propriétaire
								</h3>
								<Button
									type="role-select-right"
									onClick={() => setRole("owner")}
								>
									Je suis un·e propriétaire de chien
								</Button>
							</div>
						</div>
					</section>
				</>
			) : (
				<Form
					className="registration__form"
					title="Inscription"
					onSubmit={handleSubmit}
				>
					{role === "trainer" && (
						<TextInput color="dark" type="SIRET" required />
					)}

					{role === "trainer" && (
						<TextInput color="dark" type="company_name" required />
					)}

					<TextInput color="dark" type="lastname" required />
					<TextInput color="dark" type="firstname" required />
					<TextInput color="dark" type="email" required />
					<TextInput color="dark" type="password" required />
					<TextInput color="dark" type="city" required />
					<TextInput color="dark" type="postal_code" required />
					<TextInput color="dark" type="telephone" />
					<input type="hidden" name="role" value={role} />
					<Button type="btn-dark" href="/registration">
						Retour
					</Button>

					<Button type="submit">S'inscrire</Button>
					<p>
						<i>Les champs comportants une * sont obligatoires.</i>
					</p>
					<br />
					<p>
						Si vous avez déjà un compte vous pouvez{" "}
						<a href="/login"> vous connecter ici</a>.
					</p>
				</Form>
			)}
		</main>
	);
}

export default Registration;

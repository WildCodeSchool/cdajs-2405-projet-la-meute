import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "@/components/_molecules/Form/Form";
import "./Registration.scss";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";

function Registration() {
	const [role, setRole] = useState<"trainer" | "owner" | null>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);

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
									type="button"
									style="role-select-left"
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
									type="button"
									style="role-select-right"
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
						<TextInput style="dark" type="SIRET" required />
					)}

					{role === "trainer" && (
						<TextInput style="dark" type="company_name" required />
					)}

					<TextInput style="dark" type="lastname" required />
					<TextInput style="dark" type="firstname" required />
					<TextInput style="dark" type="email" ref={emailRef} required />
					<TextInput style="dark" type="password" ref={passwordRef} required />
					<TextInput
						style="dark"
						type="confirmPassword"
						ref={confirmPasswordRef}
						passwordRef={passwordRef}
						required
					/>
					<TextInput style="dark" type="city" required />
					<TextInput style="dark" type="postal_code" required />
					<TextInput style="dark" type="telephone" />
					<input type="hidden" name="role" value={role} />
					<Button type="button" style="btn-dark" href="/registration">
						Retour
					</Button>

					<Button type="submit" style="submit">
						S'inscrire
					</Button>
					<p>
						<p className="userMessage">
							Les champs comportants une * sont obligatoires.
						</p>
					</p>
					<p>
						Si vous avez déjà un compte vous pouvez{" "}
						<a href="/login">vous connecter ici</a>.
					</p>
				</Form>
			)}
		</main>
	);
}

export default Registration;

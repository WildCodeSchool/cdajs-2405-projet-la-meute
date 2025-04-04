import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "@/graphQL/mutations/user";
import Form from "@/components/_molecules/Form/Form";
import "./Registration.scss";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import { toast } from "react-toastify";

function Registration() {
	const [role, setRole] = useState<"trainer" | "owner" | null>(null);
	const [error, setError] = useState<string | null>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();

	const [registerUser] = useMutation(REGISTER_USER);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);

		// Vérification des mots de passe
		if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
			setError("Les mots de passe ne correspondent pas");
			return;
		}

		try {
			const formElement = e.currentTarget;
			const formData = new FormData(formElement);

			const userData = {
				lastname: formData.get("lastname") as string,
				firstname: formData.get("firstname") as string,
				email: formData.get("email") as string,
				password: formData.get("password") as string,
				phone_number: (formData.get("telephone") as string) || "",
				city: formData.get("city") as string,
				postal_code: formData.get("postal_code") as string,
				role: role,
				...(role === "trainer" && {
					siret: formData.get("SIRET") as string,
					company_name: formData.get("company_name") as string,
				}),
			};

			const { data } = await registerUser({
				variables: userData,
			});

			if (data?.registerUser) {
				toast.success(
					"Inscription reussie ! Vous pouvez maintenant vous connecter.",
				);
				navigate("/login");
			}
		} catch (err) {
			const errorMessage =
				err instanceof Error
					? err.message
					: "Une erreur est survenue lors de l'inscription";
			setError(errorMessage);
			toast.error(
				"Il y a eu une erreur dans votre inscription. Contactez le support.",
			);
		}
	};

	const title =
		role === "trainer" ? "🙋🏻‍♂️ Éducateur · rice" : "🐶 Propriétaire";

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
				<>
					<section className="registration__section--choice">
						<h2 className="homepage__title">Inscription</h2>
						<div className="registration__div--choice">
							<Form
								className="registration__form"
								title={title}
								onSubmit={handleSubmit}
							>
								<div className="registration__form--columns">
									{role === "trainer" && (
										<TextInput style="dark" type="SIRET" required />
									)}

									{role === "trainer" && (
										<TextInput
											style="dark"
											className="textInput-email"
											type="company_name"
											required
										/>
									)}

									<TextInput
										style="dark"
										type="lastname"
										name="lastname"
										required
									/>
									<TextInput
										style="dark"
										type="firstname"
										name="firstname"
										required
									/>
									<TextInput
										style="dark"
										type="email"
										name="email"
										ref={emailRef}
										required
									/>
									<TextInput
										style="dark"
										type="password"
										name="password"
										ref={passwordRef}
										required
									/>
									<TextInput
										style="dark"
										type="confirmPassword"
										name="confirmPassword"
										ref={confirmPasswordRef}
										passwordRef={passwordRef}
										required
									/>
									<TextInput style="dark" type="city" name="city" required />
									<TextInput
										style="dark"
										type="postal_code"
										name="postal_code"
										required
									/>
									<TextInput style="dark" type="telephone" name="telephone" />
									<input type="hidden" name="role" value={role} />

									{error && (
										<div
											className="error-message"
											style={{ color: "red", marginTop: "10px" }}
										>
											{error}
										</div>
									)}
								</div>
								<div className="registration__form--columns registration__form--footer">
									<div className="form-footer">
										<p className="userMessage">
											Les champs comportants une * sont obligatoires.
										</p>
										<p className="login-link">
											Si vous avez déjà un compte vous pouvez{" "}
											<Link to="/login">vous connecter ici</Link>.
										</p>
									</div>
									<div className="registration__btn">
										<Button
											type="button"
											style="btn-dark-secondary"
											className="registration__btn--comeback"
											onClick={() => setRole(null)}
										>
											Retour
										</Button>

										<Button
											type="submit"
											className="registration__btn--submit"
											style="submit"
										>
											S'inscrire
										</Button>
									</div>
								</div>
							</Form>
						</div>
					</section>
				</>
			)}
		</main>
	);
}

export default Registration;

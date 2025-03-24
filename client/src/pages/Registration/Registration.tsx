import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useForm } from "@/hooks/useForm";
import { REGISTER_USER } from "@/graphQL/mutations/user";
import Form from "@/components/_molecules/Form/Form";
import "./Registration.scss";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import { toast } from "react-toastify";

interface RegistrationFormValues extends Record<string, unknown> {
	lastname: string;
	firstname: string;
	email: string;
	password: string;
	confirmPassword: string;
	city: string;
	postal_code: string;
	telephone: string;
	SIRET?: string;
	company_name?: string;
}

function Registration() {
	const [role, setRole] = useState<"trainer" | "owner" | null>(null);
	const [error, setError] = useState<string | null>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();

	const [registerUser] = useMutation(REGISTER_USER);

	const form = useForm<RegistrationFormValues>({
		initialValues: {
			lastname: "",
			firstname: "",
			email: "",
			password: "",
			confirmPassword: "",
			city: "",
			postal_code: "",
			telephone: "",
			SIRET: "",
			company_name: "",
		},
		onSubmit: async (formValues) => {
			await handleSubmit(formValues);
		},
	});

	const handleSubmit = async (formValues: RegistrationFormValues) => {
		setError(null);

		// Vérification des mots de passe
		if (formValues.password !== formValues.confirmPassword) {
			setError("Les mots de passe ne correspondent pas");
			return;
		}

		try {
			const userData = {
				lastname: formValues.lastname,
				firstname: formValues.firstname,
				email: formValues.email,
				password: formValues.password,
				phone_number: formValues.telephone || "",
				city: formValues.city,
				postal_code: formValues.postal_code,
				role: role,
				...(role === "trainer" && {
					siret: formValues.SIRET,
					company_name: formValues.company_name,
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
					onSubmit={form.handleSubmit}
				>
					{role === "trainer" && (
						<TextInput
							style="dark"
							type="SIRET"
							name="SIRET"
							value={form.values.SIRET || ""}
							onChange={form.handleChange}
							required
						/>
					)}

					{role === "trainer" && (
						<TextInput
							style="dark"
							type="company_name"
							name="company_name"
							value={form.values.company_name || ""}
							onChange={form.handleChange}
							required
						/>
					)}

					<TextInput
						style="dark"
						type="lastname"
						name="lastname"
						value={form.values.lastname}
						onChange={form.handleChange}
						required
					/>
					<TextInput
						style="dark"
						type="firstname"
						name="firstname"
						value={form.values.firstname}
						onChange={form.handleChange}
						required
					/>
					<TextInput
						style="dark"
						type="email"
						name="email"
						value={form.values.email}
						onChange={form.handleChange}
						required
					/>
					<TextInput
						style="dark"
						type="password"
						name="password"
						value={form.values.password}
						onChange={form.handleChange}
						ref={passwordRef}
						required
					/>
					<TextInput
						style="dark"
						type="confirmPassword"
						name="confirmPassword"
						value={form.values.confirmPassword}
						onChange={form.handleChange}
						ref={confirmPasswordRef}
						passwordRef={passwordRef}
						required
					/>
					<TextInput
						style="dark"
						type="city"
						name="city"
						value={form.values.city}
						onChange={form.handleChange}
						required
					/>
					<TextInput
						style="dark"
						type="postal_code"
						name="postal_code"
						value={form.values.postal_code}
						onChange={form.handleChange}
						required
					/>
					<TextInput
						style="dark"
						type="telephone"
						name="telephone"
						value={form.values.telephone}
						onChange={form.handleChange}
					/>
					<input type="hidden" name="role" value={role} />

					{error && (
						<div
							className="error-message"
							style={{ color: "red", marginTop: "10px" }}
						>
							{error}
						</div>
					)}

					<Button type="button" style="btn-dark" onClick={() => setRole(null)}>
						Retour
					</Button>

					<Button type="submit" style="submit">
						S'inscrire
					</Button>

					<div className="form-footer">
						<p className="userMessage">
							Les champs comportants une * sont obligatoires.
						</p>
						<p className="login-link">
							Si vous avez déjà un compte vous pouvez{" "}
							<Link to="/login">vous connecter ici</Link>.
						</p>
					</div>
				</Form>
			)}
		</main>
	);
}

export default Registration;

import Form from "@/components/_molecules/Form/Form";
import "./Login.scss";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import { useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";
import { useForm } from "@/hooks/useForm";
import { useMutation } from "@apollo/client";
import { PASSWORD_RESET_BY_EMAIL } from "@/graphQL/mutations/user";

function NewPassword() {
	const [searchParams] = useSearchParams();
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);
	const token = searchParams.get("token");
	const [message, setMessage] = useState("");

	const [resetPasswordByEmail, { loading }] = useMutation(
		PASSWORD_RESET_BY_EMAIL,
		{
			onCompleted: (data) => {
				if (data.PasswordResetByEmail.success) {
					window.location.href = "/login";
				}
				setMessage(data.PasswordResetByEmail.message);
			},
			onError: (error) => setMessage(error.message),
		},
	);

	const form = useForm({
		initialValues: {
			password: "",
			confirmPassword: "",
		},
		onSubmit: async (values) => {
			try {
				await resetPasswordByEmail({
					variables: {
						token,
						newPassword: values.password,
					},
				});
			} catch (err) {
				console.error("Password reset error:", err);
			}
		},
	});

	return (
		<main className="login">
			<Form
				className="login__form"
				title="Renseignez un nouveau mot de passe"
				onSubmit={form.handleSubmit}
			>
				<p className="introductiveText">
					Ajoutez un nouveau mot de passe puis valider votre nouveau mot de
					passe.
				</p>
				<TextInput
					style="dark"
					type="password"
					name="password"
					ref={passwordRef}
					value={form.values.password}
					onChange={form.handleChange}
					required
				/>
				<TextInput
					style="dark"
					type="confirmPassword"
					name="confirmPassword"
					passwordRef={confirmPasswordRef}
					value={form.values.confirmPassword}
					onChange={form.handleChange}
					required
				/>
				{message && <p className="login__errorMessage">{message}</p>}
				<Button type="submit" style="submit">
					{loading
						? "Validation en cours..."
						: "Valider mon nouveau mot de passe"}
				</Button>
			</Form>
		</main>
	);
}

export default NewPassword;

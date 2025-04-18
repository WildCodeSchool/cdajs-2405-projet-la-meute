import Form from "@/components/_molecules/Form/Form";
import "./Login.scss";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import { useMutation } from "@apollo/client";
import { useForm } from "@/hooks/useForm";
import { REQUEST_PASSWORD_RESET } from "@/graphQL/mutations/user";

function ResetPassword() {
	const [RequestPasswordReset, { loading }] = useMutation(
		REQUEST_PASSWORD_RESET,
		{
			onCompleted: (data) => {
				if (data.RequestPasswordReset.success) {
					window.location.href = "/forgot-password";
				}
			},
			onError: (error) => {
				console.error("Login error:", error);
			},
		},
	);

	const form = useForm({
		initialValues: {
			email: "",
		},
		onSubmit: async (values) => {
			try {
				await RequestPasswordReset({
					variables: { email: values.email },
				});
			} catch (err) {
				// TODO: handle error
				console.error("Login error:", err);
			}
		},
	});

	return (
		<main className="login">
			<Form
				className="login__form"
				title="Mot de passe oublié ?"
				onSubmit={form.handleSubmit}
			>
				<p className="introductiveText">
					Saisissez votre adresse e-mail et nous vous enverrons des instructions
					pour réinitialiser votre mot de passe.
				</p>
				<TextInput
					style="dark"
					type="email"
					value={form.values.email}
					onChange={form.handleChange}
					required
				/>
				<Button type="submit" style="submit">
					{loading ? "Envoi en cours..." : "Envoyer à cette adresse email"}
				</Button>
			</Form>
		</main>
	);
}

export default ResetPassword;

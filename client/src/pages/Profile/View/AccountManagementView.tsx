import Button from "@/components/_atoms/Button/Button";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import { PASSWORDRESET } from "@/graphQL/mutations/user";
import { useForm } from "@/hooks/useForm";
import { useUser } from "@/hooks/useUser";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

function AccountManagementView() {
	const { user } = useUser();
	const [resetPassword] = useMutation(PASSWORDRESET);

	const resetPasswordForm = useForm({
		initialValues: {
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
			email: user?.email || "",
		},
		onSubmit: async (formValues) => {
			try {
				if (formValues.oldPassword === formValues.newPassword) {
					toast.error(
						"Le nouveau mot de passe doit être différent de l'ancien",
					);
					return;
				}

				const { data } = await resetPassword({
					variables: {
						oldPassword: formValues.oldPassword,
						newPassword: formValues.newPassword,
						email: user?.email,
					},
				});

				if (data.passwordReset.success) {
					toast.success(data.passwordReset.message);

					resetPasswordForm.resetForm();
				} else {
					toast.error(data.passwordReset.message);
				}
			} catch (error) {
				toast.error("Une erreur est survenue lors de la sauvegarde.");
			}
		},
	});

	return (
		<form className="profile__form" onSubmit={resetPasswordForm.handleSubmit}>
			<h3>Réinitialiser le mot de passe</h3>
			<div>
				<TextInput
					style="light"
					type="oldPassword"
					name="oldPassword"
					value={resetPasswordForm.values.oldPassword}
					onChange={resetPasswordForm.handleChange}
					required
				/>
				<TextInput
					style="light"
					type="password"
					name="newPassword"
					value={resetPasswordForm.values.newPassword}
					onChange={resetPasswordForm.handleChange}
					required
				/>
				<TextInput
					style="light"
					type="confirmPassword"
					name="confirmPassword"
					value={resetPasswordForm.values.confirmPassword}
					passwordRef={resetPasswordForm.values.newPassword}
					onChange={resetPasswordForm.handleChange}
					required
				/>
				<Button
					className="profile__form--button"
					type="submit"
					style="btn-dark"
				>
					Réinitialiser le mot de passe
				</Button>
			</div>
		</form>
	);
}

export default AccountManagementView;

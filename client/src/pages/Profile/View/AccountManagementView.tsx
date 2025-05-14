import Button from "@/components/_atoms/Button/Button";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import { PASSWORD_RESET } from "@/graphQL/mutations/user";
import { useForm } from "@/hooks/useForm";
import { useUser } from "@/hooks/useUser";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AccountManagementView() {
	const { user } = useUser();
	const [resetPassword] = useMutation(PASSWORD_RESET);
	const [openSection, setOpenSection] = useState<"reset" | "delete" | null>(
		null,
	);

	const handleAccordion = (section: "reset" | "delete") => {
		setOpenSection((prev) => (prev === section ? null : section));
	};

	const getToggleSymbol = (section: "reset" | "delete") =>
		openSection === section ? "-" : "+";

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
			<span
				onClick={() => handleAccordion("reset")}
				onKeyDown={() => handleAccordion("reset")}
				className="profile__form--title"
			>
				<h3 className="accordion__title">Réinitialiser le mot de passe</h3>
				<p className="accordion__toggle">{getToggleSymbol("reset")}</p>
			</span>
			{openSection === "reset" && (
				<div className="accordion__content">
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
			)}

			<span
				onClick={() => handleAccordion("delete")}
				onKeyDown={() => handleAccordion("delete")}
				className="profile__form--title"
			>
				<h3 className="accordion__title profile__form--delete">
					Supprimer le compte
				</h3>
				<p className="accordion__toggle">{getToggleSymbol("delete")}</p>
			</span>
			{openSection === "delete" && (
				<div className="accordion__content">
					<p>Attention, cette action est irréversible.</p>
					<p>
						Vos informations personnelles seront supprimées de notre base de
						données, mais les informations liées aux évènements que vous avez
						organisés seront conservées.
					</p>
					<Button
						className="profile__form--button"
						type="submit"
						style="btn-cancel"
					>
						Supprimer le compte
					</Button>
				</div>
			)}
		</form>
	);
}

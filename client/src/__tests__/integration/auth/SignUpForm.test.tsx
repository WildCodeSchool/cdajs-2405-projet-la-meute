import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

import Registration from "@/pages/Registration/Registration";

describe("Registration", () => {
	const fieldLabels = [
		{ label: "Noms", error: /Le nom est requis/i },
		{ label: "Prénom", error: /Le prénom est requis/i },
		{ label: "Ville", error: /La ville est requise/i },
		{ label: "Code postal", error: /Le code postal est requis/i },
		{ label: "Email", error: /L'email est requis/i },
		{ label: "Mot de passe", error: /Le mot de passe est requis/i },
		{
			label: "Confirmer le mot de passe",
			error: /La confirmation du mot de passe est requise/i,
		},
	];

	const optionalFields = ["Téléphone"];

	it("renders all fields in the Registration", async () => {
		render(<Registration />);

		for (const { label } of fieldLabels) {
			const field = await screen.findByLabelText(label);
			expect(field).toBeInTheDocument();
		}

		// Vérifie que les champs optionnels sont également présents
		for (const label of optionalFields) {
			const field = await screen.findByLabelText(label);
			expect(field).toBeInTheDocument();
		}

		const signUpButton = await screen.findByRole("button", {
			name: "S'inscrire",
		});
		expect(signUpButton).toBeInTheDocument();
	});

	it("should have password fields of type 'password'", async () => {
		render(<Registration />);

		const passwordField = await screen.findByLabelText("Mot de passe");
		const confirmPasswordField = await screen.findByLabelText(
			"Confirmer le mot de passe",
		);

		expect(passwordField).toHaveAttribute("type", "password");
		expect(confirmPasswordField).toHaveAttribute("type", "password");
	});

	it("should show error messages for all empty required fields", async () => {
		render(<Registration />);

		const signUpButton = await screen.findByRole("button", {
			name: "S'inscrire",
		});
		await userEvent.click(signUpButton);

		// Vérifie les messages d'erreur pour chaque champ requis
		for (const { error } of fieldLabels) {
			const errorMessage = await screen.findByText(error);
			expect(errorMessage).toBeInTheDocument();
		}
	});

	it("should show error message if passwords do not match", async () => {
		render(<Registration />);

		const emailField = await screen.findByLabelText("Email");
		const passwordField = await screen.findByLabelText("Mot de passe");
		const confirmPasswordField = await screen.findByLabelText(
			"Confirmer le mot de passe",
		);
		const signUpButton = await screen.findByRole("button", {
			name: "S'inscrire",
		});

		await userEvent.type(emailField, "newuser@example.com");
		await userEvent.type(passwordField, "securePassword");
		await userEvent.type(confirmPasswordField, "differentPassword");

		await userEvent.click(signUpButton);

		const confirmPasswordError = await screen.findByText(
			/Les mots de passe ne correspondent pas/i,
		);
		expect(confirmPasswordError).toBeInTheDocument();
	});

	it("should send a signup request and show success message", async () => {
		render(<Registration />);

		const signUpButton = await screen.findByRole("button", {
			name: "S'inscrire",
		});

		// Remplir tous les champs requis
		for (const { label } of fieldLabels) {
			const field = await screen.findByLabelText(label);

			if (label === "Mot de passe" || label === "Confirmer le mot de passe") {
				await userEvent.type(field, "securePassword");
			} else if (label === "Email") {
				await userEvent.type(field, "newuser@example.com");
			} else {
				await userEvent.type(field, "dummy value");
			}
		}

		await userEvent.click(signUpButton);

		// Vérifie la confirmation de succès
		await waitFor(() => screen.getByText(/Inscription réussie/i));
	});
});

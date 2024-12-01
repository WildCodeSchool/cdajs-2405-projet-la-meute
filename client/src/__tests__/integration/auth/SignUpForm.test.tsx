import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

import SignUpForm from "@/components/ComponentName/SignUpForm/SignUpForm";

describe("SignUpForm", () => {
	it("renders the SignUpForm component", async () => {
		render(<SignUpForm />);

		const name = await screen.findByLabelText("Noms");
		const firstname = await screen.findByLabelText("Prénom");
		const phoneNumber = await screen.findByLabelText("Téléphone");
		const city = await screen.findByLabelText("Ville");
		const postalCode = await screen.findByLabelText("Code postal");
		const emailField = await screen.findByLabelText("Email");
		const passwordField = await screen.findByLabelText("Mot de passe");
		const confirmPasswordField = await screen.findByLabelText(
			"Confirmer le mot de passe",
		);
		const signUpButton = await screen.findByRole("button", {
			name: "S'inscrire",
		});

		expect(name).toBeInTheDocument();
		expect(firstname).toBeInTheDocument();
		expect(phoneNumber).toBeInTheDocument();
		expect(city).toBeInTheDocument();
		expect(postalCode).toBeInTheDocument();
		expect(emailField).toBeInTheDocument();
		expect(passwordField).toBeInTheDocument();
		expect(confirmPasswordField).toBeInTheDocument();
		expect(signUpButton).toBeInTheDocument();
	});

	it("should have password input of type 'password'", async () => {
		render(<SignUpForm />);

		const passwordField = await screen.findByLabelText("Mot de passe");
		const confirmPasswordField = await screen.findByLabelText(
			"Confirmer le mot de passe",
		);

		expect(passwordField).toHaveAttribute("type", "password");
		expect(confirmPasswordField).toHaveAttribute("type", "password");
	});

	it("should show error message if fields are empty", async () => {
		render(<SignUpForm />);

		const signUpButton = await screen.findByRole("button", {
			name: "S'inscrire",
		});
		await userEvent.click(signUpButton);

		// Vérifie que les messages d'erreur sont affichés pour les champs vides
		const emailError = await screen.findByText(/L'email est requis/i);
		const passwordError = await screen.findByText(
			/Le mot de passe est requis/i,
		);
		const confirmPasswordError = await screen.findByText(
			/La confirmation du mot de passe est requise/i,
		);

		expect(emailError).toBeInTheDocument();
		expect(passwordError).toBeInTheDocument();
		expect(confirmPasswordError).toBeInTheDocument();
	});

	it("should show error message if passwords do not match", async () => {
		render(<SignUpForm />);

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
		render(<SignUpForm />);

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
		await userEvent.type(confirmPasswordField, "securePassword");

		await userEvent.click(signUpButton);

		await waitFor(() => screen.getByText(/Inscription réussie/i));
	});
});

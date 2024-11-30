import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import "@testing-library/jest-dom";

import LoginForm from "@/components/ComponentName/LoginForm/LoginForm";

describe("LoginForm", () => {
	it("renders the LoginForm component", async () => {
		render(<LoginForm />);

		const title = await screen.findByRole("heading", {
			name: "Connectez-vous ici",
		});
		const emailField = await screen.findByLabelText("Email");
		const passwordField = await screen.findByLabelText("Mot de passe");
		const loginButton = await screen.findByRole("button", {
			name: "Me connecter",
		});
		const cancelButton = await screen.findByRole("button", { name: "Annuler" });

		expect(title).toBeInTheDocument();
		expect(emailField).toBeInTheDocument();
		expect(passwordField).toBeInTheDocument();
		expect(loginButton).toBeInTheDocument();
		expect(cancelButton).toBeInTheDocument();
	});

	it("should send error message when fields are empty", async () => {
		render(<LoginForm />);
		
		const loginButton = await screen.findByRole("button", {
			name: "Me connecter",
		});

		userEvent.click(loginButton);

		// Vérifie qu'un message d'erreur est affiché pour chaque champ vide 
		const emailError = await screen.findByText(/L'email est requis/);
		const passwordError = await screen.findByText(/Le mot de passe est requis/);
	
		expect(emailError).toBeInTheDocument();
		expect(passwordError).toBeInTheDocument();

	})
});

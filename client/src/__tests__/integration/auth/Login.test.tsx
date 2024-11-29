import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

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
});

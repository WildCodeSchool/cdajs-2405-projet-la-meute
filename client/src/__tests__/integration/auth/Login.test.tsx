import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server } from "@/__tests__/mocks/loginHandler";

import "@testing-library/jest-dom";

import LoginForm from "@/components/ComponentName/LoginForm/LoginForm";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

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

	it("should have password input of type 'password'", async () => {
		render(<LoginForm />);

		const passwordField = await screen.findByLabelText("Mot de passe");

		expect(passwordField).toHaveAttribute("type", "password");
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
	});

	it("sends a login request with wrong credentials and handle errors", async () => {
		render(<LoginForm />);

		const emailField = await screen.findByLabelText("Email");
		const passwordField = await screen.findByLabelText("Mot de passe");
		const loginButton = await screen.findByRole("button", {
			name: "Me connecter",
		});

		await userEvent.type(emailField, "Youki@PawPlanner.com");
		await userEvent.type(passwordField, "wrongPassword");

		await userEvent.click(loginButton);

		await waitFor(() => screen.getByText(/Identifiants invalides/i));
	});

	it("JWT is stored in cookie after successful login", async () => {
		render(<LoginForm />);

		const emailField = await screen.findByLabelText("Email");
		const passwordField = await screen.findByLabelText("Mot de passe");
		const loginButton = await screen.findByRole("button", {
			name: "Me connecter",
		});

		await userEvent.type(emailField, "Youki@PawPlanner.com");
		await userEvent.type(passwordField, "securePassword");
		await userEvent.click(loginButton);

		expect(document.cookie).toContain("jwt=fake-jwt-token");

		const dashboardHeading = await screen.findByRole("heading", {
			name: /Bonjour/,
		});
		expect(dashboardHeading).toBeInTheDocument();
	});
});

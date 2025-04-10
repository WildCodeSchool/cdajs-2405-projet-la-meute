import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { mocks } from "@/__tests__/mocks/authMocks";

import Login from "@/pages/Login/Login";

describe("Login", () => {
	it("renders the Login component", async () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<MemoryRouter>
					<Login />
				</MemoryRouter>
			</MockedProvider>,
		);
		const title = await screen.findByRole("heading", {
			name: "Connectez-vous ici",
		});
		const emailField = await screen.findByLabelText(/email/i);
		const passwordField = await screen.findByLabelText(/^Mot de passe/i);
		const loginButton = await screen.findByRole("button", {
			name: "Me connecter",
		});

		expect(title).toBeInTheDocument();
		expect(emailField).toBeInTheDocument();
		expect(passwordField).toBeInTheDocument();
		expect(loginButton).toBeInTheDocument();
	});

	it("should have password input of type 'password'", async () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<MemoryRouter>
					<Login />
				</MemoryRouter>
			</MockedProvider>,
		);

		const passwordField = await screen.findByLabelText(/^Mot de passe/i);

		expect(passwordField).toHaveAttribute("type", "password");
	});

	it("sends a login request with wrong credentials and handle errors", async () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<MemoryRouter>
					<Login />
				</MemoryRouter>
			</MockedProvider>,
		);

		const emailField = await screen.findByLabelText(/email/i);
		const passwordField = await screen.findByLabelText(/^Mot de passe/i);
		const loginButton = await screen.findByRole("button", {
			name: "Me connecter",
		});

		await userEvent.type(emailField, "Youki@PawPlanner.com");
		await userEvent.type(passwordField, "wrongPassword");

		await userEvent.click(loginButton);

		await waitFor(() => screen.getByText(/Identifiants invalides/i));
	});

	it("JWT is stored in localStorage after successful login", async () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<MemoryRouter initialEntries={["/login"]}>
					<Login />
				</MemoryRouter>
			</MockedProvider>,
		);

		const emailField = await screen.findByLabelText(/email/i);
		const passwordField = await screen.findByLabelText(/^Mot de passe/i);
		const loginButton = await screen.findByRole("button", {
			name: "Me connecter",
		});

		await userEvent.type(emailField, "Youki@PawPlanner.com");
		await userEvent.type(passwordField, "Youki");
		await userEvent.click(loginButton);

		await waitFor(() => {
			expect(localStorage.getItem("authToken")).toBe("fake-jwt-token");
		});
	});
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { mocks } from "@/__tests__/mocks/authMocks";

import Registration from "@/pages/Registration/Registration";

describe("Registration", () => {
	it("renders all fields in the Registration", async () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<MemoryRouter>
					<Registration />
				</MemoryRouter>
			</MockedProvider>,
		);

		const trainerButton = await screen.findByText(
			"Je suis éducateur·trice canin·e",
		);
		await userEvent.click(trainerButton);

		const title = await screen.findByRole("heading", {
			name: "Inscription",
		});
		const siretField = await screen.findByLabelText(/siret/i);
		const enterpriseField =
			await screen.findByLabelText(/^Nom de l'entreprise/i);
		const nameField = screen.getByLabelText(/Nom\s*\*/i, {
			selector: 'input[name="lastname"]',
		});
		const firstnameField = await screen.findByLabelText(/prénom/i);
		const emailField = await screen.findByLabelText(/email/i);
		const passwordField = await screen.findByLabelText(/^Mot de passe/i);
		const confirmPasswordField = await screen.findByLabelText(
			/^Confirmation mot de passe/i,
		);
		const cityField = await screen.findByLabelText(/ville/i);
		const postalCodeField = await screen.findByLabelText(/Code Postal/i);
		const phoneNumberField =
			await screen.findByLabelText(/Numéro de téléphone/i);

		const backButton = await screen.findByRole("button", {
			name: "Retour",
		});

		const signUpButton = await screen.findByRole("button", {
			name: "S'inscrire",
		});

		expect(title).toBeInTheDocument();
		expect(siretField).toBeInTheDocument();
		expect(enterpriseField).toBeInTheDocument();
		expect(nameField).toBeInTheDocument();
		expect(firstnameField).toBeInTheDocument();
		expect(emailField).toBeInTheDocument();
		expect(passwordField).toBeInTheDocument();
		expect(confirmPasswordField).toBeInTheDocument();
		expect(cityField).toBeInTheDocument();
		expect(postalCodeField).toBeInTheDocument();
		expect(phoneNumberField).toBeInTheDocument();
		expect(backButton).toBeInTheDocument();
		expect(signUpButton).toBeInTheDocument();

		expect(siretField).toHaveAttribute("required");
		expect(enterpriseField).toHaveAttribute("required");
		expect(nameField).toHaveAttribute("required");
		expect(firstnameField).toHaveAttribute("required");
		expect(emailField).toHaveAttribute("required");
		expect(passwordField).toHaveAttribute("required");
		expect(confirmPasswordField).toHaveAttribute("required");
		expect(cityField).toHaveAttribute("required");
		expect(postalCodeField).toHaveAttribute("required");
	});

	it("should have password fields of type 'password'", async () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<MemoryRouter>
					<Registration />
				</MemoryRouter>
			</MockedProvider>,
		);

		const trainerButton = await screen.findByText(
			"Je suis éducateur·trice canin·e",
		);
		await userEvent.click(trainerButton);

		const passwordField = await screen.findByLabelText(/^Mot de passe/i);
		const confirmPasswordField = await screen.findByLabelText(
			/^Confirmation mot de passe/i,
		);

		expect(passwordField).toHaveAttribute("type", "password");
		expect(confirmPasswordField).toHaveAttribute("type", "password");
	});

	it("should show error message if passwords do not match", async () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<MemoryRouter>
					<Registration />
				</MemoryRouter>
			</MockedProvider>,
		);

		const trainerButton = await screen.findByText(
			"Je suis éducateur·trice canin·e",
		);
		await userEvent.click(trainerButton);

		const emailField = await screen.findByLabelText(/email/i);
		const passwordField = await screen.findByLabelText(/^Mot de passe/i);
		const confirmPasswordField = await screen.findByLabelText(
			/^Confirmation mot de passe/i,
		);
		const signUpButton = await screen.findByRole("button", {
			name: "S'inscrire",
		});

		await userEvent.type(emailField, "newuser@example.com");
		await userEvent.type(passwordField, "securePassword");
		await userEvent.type(confirmPasswordField, "differentPassword");

		await userEvent.click(signUpButton);

		const confirmPasswordInputWrapper = await screen.findByLabelText(
			/^Confirmation mot de passe/i,
		);

		const parentElement = confirmPasswordInputWrapper.closest("div.textInput");

		await waitFor(() => {
			expect(parentElement).toHaveAttribute(
				"data-error",
				"Les mots de passe ne correspondent pas.",
			);
		});
	});

	it("should send a signup request and show success status", async () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<MemoryRouter>
					<Registration />
				</MemoryRouter>
			</MockedProvider>,
		);

		const trainerButton = await screen.findByText(
			"Je suis éducateur·trice canin·e",
		);
		await userEvent.click(trainerButton);

		const emailField = await screen.findByLabelText(/Email/i);
		await userEvent.type(emailField, "cesarmillan@pawplanner.com");

		const passwordField = await screen.findByLabelText(/^Mot de passe/i);
		await userEvent.type(passwordField, "Cesar123");

		const confirmPasswordField = await screen.findByLabelText(
			/^Confirmation mot de passe/i,
		);
		await userEvent.type(confirmPasswordField, "Cesar123");

		const companyNameField =
			await screen.findByLabelText(/^Nom de l'entreprise/i);
		await userEvent.type(companyNameField, "Cesar's Dog Academy");

		const siretField = await screen.findByLabelText(/^SIRET/i);
		await userEvent.type(siretField, "12345678901234");

		const nameField = screen.getByLabelText(/Nom\s*\*/i, {
			selector: 'input[name="lastname"]',
		});
		await userEvent.type(nameField, "Millan");

		const firstNameField = await screen.findByLabelText(/^Prénom/i);
		await userEvent.type(firstNameField, "Cesar");

		const signUpButton = await screen.findByRole("button", {
			name: "S'inscrire",
		});
		await userEvent.click(signUpButton);

		await waitFor(() => {
			expect(mocks[2].result).toBeDefined();

			const registerUser = mocks[2].result?.data?.registerUser;
			expect(registerUser).toBeDefined();
			expect(registerUser?.email).toBe("cesarmillan@pawplanner.com");
		});

		await waitFor(() => {
			const responseStatus = mocks[2].result?.data ? "success" : "error";
			expect(responseStatus).toBe("success");
		});
	});
});

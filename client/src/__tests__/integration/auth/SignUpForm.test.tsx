// import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

// import "@testing-library/jest-dom";

// import { MemoryRouter } from "react-router-dom";
// import { MockedProvider } from "@apollo/client/testing";
// import { mocks } from "@/__tests__/mocks/authMocks";

// import Registration from "@/pages/Registration/Registration";
// import { TEXT_INPUT_CONFIG } from "@/components/_atoms/Inputs/TextInput/TextInput";

// describe("Registration", () => {
// 	const fields = [
// 		{ name: 'SIRET', label: 'SIRET' },
// 		{ name: 'company_name', label: 'Nom de l\'entreprise' },
// 		{ name: 'lastname', label: 'Nom' },
// 		{ name: 'firstname', label: 'Prénom' },
// 		{ name: 'email', label: 'Email' },
// 		{ name: 'password', label: 'Mot de passe' },
// 		{ name: 'confirmPassword', label: 'Confirmation mot de passe' },
// 		{ name: 'city', label: 'Ville' },
// 		{ name: 'postal_code', label: 'Code Postal' },
// 		{ name: 'telephone', label: 'Numéro de téléphone' }
// 	  ];

// 	it("renders all fields in the Registration", async () => {
// 		render(
// 			<MockedProvider mocks={mocks} addTypename={false}>
// 			  <MemoryRouter>
// 				<Registration />
// 			  </MemoryRouter>
// 			</MockedProvider>
// 		  );

// 		const trainerButton = await screen.findByText("Je suis éducateur·trice canin·e");
//   		await userEvent.click(trainerButton);

// 		  for (const { label } of fields) {
// 			const mappedLabel = label.toLowerCase();
// 			const inputField = await screen.findByLabelText(new RegExp(mappedLabel, 'i'));
// 			expect(inputField).toBeInTheDocument();
// 		  }

// 		  const signUpButton = await screen.findByRole("button", {
// 			name: "S'inscrire",
// 		  });
// 		  expect(signUpButton).toBeInTheDocument();
// 		});

// it("should have password fields of type 'password'", async () => {
// 	render(
// 		<MockedProvider mocks={mocks} addTypename={false}>
// 		  <MemoryRouter>
// 			<Registration />
// 		  </MemoryRouter>
// 		</MockedProvider>
// 	  );

// 	const passwordField = await screen.findByLabelText("Mot de passe");
// 	const confirmPasswordField = await screen.findByLabelText(
// 		"Confirmer le mot de passe",
// 	);

// 	expect(passwordField).toHaveAttribute("type", "password");
// 	expect(confirmPasswordField).toHaveAttribute("type", "password");
// });

// it("should show error messages for all empty required fields", async () => {
// 	render(
// 		<MockedProvider mocks={mocks} addTypename={false}>
// 		  <MemoryRouter>
// 			<Registration />
// 		  </MemoryRouter>
// 		</MockedProvider>
// 	  );

// 	const signUpButton = await screen.findByRole("button", {
// 		name: "S'inscrire",
// 	});
// 	await userEvent.click(signUpButton);

// 	// Vérifie les messages d'erreur pour chaque champ requis
// 	for (const { error } of fieldLabels) {
// 		const errorMessage = await screen.findByText(error);
// 		expect(errorMessage).toBeInTheDocument();
// 	}
// });

// it("should show error message if passwords do not match", async () => {
// 	render(
// 		<MockedProvider mocks={mocks} addTypename={false}>
// 		  <MemoryRouter>
// 			<Registration />
// 		  </MemoryRouter>
// 		</MockedProvider>
// 	  );

// 	const emailField = await screen.findByLabelText("Email");
// 	const passwordField = await screen.findByLabelText("Mot de passe");
// 	const confirmPasswordField = await screen.findByLabelText(
// 		"Confirmer le mot de passe",
// 	);
// 	const signUpButton = await screen.findByRole("button", {
// 		name: "S'inscrire",
// 	});

// 	await userEvent.type(emailField, "newuser@example.com");
// 	await userEvent.type(passwordField, "securePassword");
// 	await userEvent.type(confirmPasswordField, "differentPassword");

// 	await userEvent.click(signUpButton);

// 	const confirmPasswordError = await screen.findByText(
// 		/Les mots de passe ne correspondent pas/i,
// 	);
// 	expect(confirmPasswordError).toBeInTheDocument();
// });

// it("should send a signup request and show success message", async () => {
// 	render(
// 		<MockedProvider mocks={mocks} addTypename={false}>
// 		  <MemoryRouter>
// 			<Registration />
// 		  </MemoryRouter>
// 		</MockedProvider>
// 	  );

// 	const signUpButton = await screen.findByRole("button", {
// 		name: "S'inscrire",
// 	});

// 	// Remplir tous les champs requis
// 	for (const { label } of fieldLabels) {
// 		const field = await screen.findByLabelText(label);

// 		if (label === "Mot de passe" || label === "Confirmer le mot de passe") {
// 			await userEvent.type(field, "securePassword");
// 		} else if (label === "Email") {
// 			await userEvent.type(field, "newuser@example.com");
// 		} else {
// 			await userEvent.type(field, "dummy value");
// 		}
// 	}

// 	await userEvent.click(signUpButton);

// 	// Vérifie la confirmation de succès
// 	await waitFor(() => screen.getByText(/Inscription réussie/i));
// });
// });

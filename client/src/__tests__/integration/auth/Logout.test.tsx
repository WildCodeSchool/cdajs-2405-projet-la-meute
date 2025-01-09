import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

import Logout from "@/pages/Login/Login"; // change path when logout be created

describe("LogoutButton", () => {
	it("renders the LogoutButton component", async () => {
		render(<Logout />);

		const logoutButton = await screen.findByRole("button", {
			name: "Se déconnecter",
		});

		expect(logoutButton).toBeInTheDocument();
	});

	it("should delete jwt token in coockie and redirect at homePage", async () => {
		render(<Logout />);

		const logoutButton = await screen.findByRole("button", {
			name: "Se déconnecter",
		});

		await userEvent.click(logoutButton);

		await waitFor(() => expect(document.cookie).not.toContain("jwt="));

		await waitFor(() => expect(window.location.pathname).toBe("/"));
	});
});

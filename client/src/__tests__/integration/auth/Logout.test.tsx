import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { mocks } from "@/__tests__/mocks/authMocks";

import DashSideBar from "@/layouts/Dashboard/DashSideBar";
import { vi } from "vitest";

const mockNavigate = vi.fn();

describe("LogoutButton", () => {
	beforeAll(() => {
		vi.mock("react-router-dom", async () => {
			const actual = await vi.importActual("react-router-dom");
			return {
				...actual,
				useNavigate: () => mockNavigate,
			};
		});
	});

	it("renders the LogoutButton component", async () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<MemoryRouter>
					<DashSideBar />
				</MemoryRouter>
			</MockedProvider>,
		);

		const logoutButton = await screen.findByRole("button", {
			name: /Se déconnecter/i,
		});

		expect(logoutButton).toBeInTheDocument();
	});

	it("should delete jwt token in Localstorage and redirect at homePage", async () => {
		localStorage.setItem("authToken", "fake-jwt-token");

		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<MemoryRouter>
					<DashSideBar />
				</MemoryRouter>
			</MockedProvider>,
		);

		const logoutButton = await screen.findByRole("button", {
			name: "Se déconnecter",
		});

		await userEvent.click(logoutButton);

		await waitFor(() => {
			expect(localStorage.getItem("authToken")).toBeNull();
		});

		await waitFor(() => {
			expect(mockNavigate).toHaveBeenCalledWith("/login");
		});
	});
});

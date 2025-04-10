import { LOGIN, REGISTER_USER } from "@/graphQL/mutations/user";

export const mocks = [
	{
		request: {
			query: LOGIN,
			variables: { email: "Youki@PawPlanner.com", password: "Youki" },
		},
		result: {
			data: {
				login: "fake-jwt-token",
			},
		},
	},
	{
		request: {
			query: LOGIN,
			variables: { email: "Youki@PawPlanner.com", password: "wrongPassword" },
		},
		error: new Error("Invalid credentials"),
	},

	{
		request: {
			query: REGISTER_USER,
			variables: {
				email: "cesarmillan@pawplanner.com",
				password: "Cesar123",
				confirmPassword: "Cesar123",
				firstName: "Cesar",
				lastName: "Millan",
				companyName: "Cesar's Dog Academy",
				siret: "12345678901234",
			},
		},
		result: {
			data: {
				registerUser: {
					id: "123",
					email: "cesarmillan@pawplanner.com",
					firstName: "Cesar",
					lastName: "Millan",
				},
			},
		},
	},
];

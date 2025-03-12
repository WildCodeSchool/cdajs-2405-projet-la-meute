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
];

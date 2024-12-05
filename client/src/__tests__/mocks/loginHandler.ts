import { setupServer } from "msw/node";
import { HttpResponse, graphql } from "msw";

export const server = setupServer(
	graphql.mutation("login", ({ variables }) => {
		const { email, password } = variables.input;

		if (email === "Youki@PawPlanner.com" && password === "securePassword") {
			return HttpResponse.json(
				{
					data: {
						login: {
							user: {
								id: "1",
								email: "Youki@PawPlanner.com",
								name: "Youki",
							},
						},
					},
				},
				{
					headers: {
						"Set-Cookie": "jwt=fake-jwt-token; Path=/; HttpOnly; Secure",
					},
				},
			);
		}

		return HttpResponse.json(
			{
				errors: [
					{
						message: "Identifiants invalides",
						extensions: { code: "UNAUTHENTICATED" },
					},
				],
			},
			{ status: 401 },
		);
	}),
);

import { useMutation, ApolloError } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { LOGIN } from "@/graphQL/mutations/user";
import client from "@/graphQL/apolloClient";
import { ME } from "@/graphQL/queries/user";

export interface DecodedToken {
	role: string;
	userId: number;
}

interface LoginResponse {
	success: boolean;
	message?: string;
}

type AuthRole = "owner" | "trainer";

export const useAuth = () => {
	const [loginMutation, { data, loading }] = useMutation(LOGIN);
	const navigate = useNavigate();
	const { updateAuth } = useContext(AuthContext);

	const login = async (
		email: string,
		password: string,
	): Promise<LoginResponse> => {
		try {
			updateAuth({ isLoading: true, error: null });

			const response = await loginMutation({
				variables: { email, password },
			});

			const token = response.data?.login;

			if (!token) {
				updateAuth({ isLoading: false });
				return {
					success: false,
					message: "Identifiants invalides",
				};
			}

			localStorage.setItem("authToken", token);
			const decoded = jwtDecode<DecodedToken>(token);

			const role: AuthRole =
				decoded.role === "owner" || decoded.role === "trainer"
					? (decoded.role as AuthRole)
					: "owner";

			try {
				const { data } = await client.query({
					query: ME,
					variables: {
						token,
						isTrainer: role === "trainer",
					},
					fetchPolicy: "no-cache",
				});

				if (data.me) {
					updateAuth({
						user: data.me,
						role,
						isLoading: false,
					});

					navigate(`/${role.toLowerCase()}`);
					return { success: true };
				}
				updateAuth({
					isLoading: false,
					error: null,
				});
				localStorage.removeItem("authToken");
				return {
					success: false,
					message: "Erreur lors de la récupération des données utilisateur",
				};
			} catch (meError) {
				const error =
					meError instanceof Error ? meError : new Error("Erreur inconnue");
				updateAuth({
					isLoading: false,
					error: meError instanceof ApolloError ? meError : null,
				});
				localStorage.removeItem("authToken");
				return {
					success: false,
					message:
						error.message ||
						"Erreur lors de la récupération des données utilisateur",
				};
			}
		} catch (loginError) {
			updateAuth({
				isLoading: false,
				error: loginError instanceof ApolloError ? loginError : null,
			});
			return {
				success: false,
				message: "Identifiants invalides",
			};
		}
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		updateAuth({
			user: null,
			role: null,
			isLoading: false,
			error: null,
		});
		navigate("/login");
	};

	return {
		login,
		logout,
		loading,
		data,
	};
};

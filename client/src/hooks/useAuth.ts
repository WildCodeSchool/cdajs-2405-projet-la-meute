import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { LOGIN } from "@/graphQL/mutations/user";

export interface DecodedToken {
	role: string;
	userId: number;
}

interface LoginResponse {
	success: boolean;
	message?: string;
}

export const useAuth = () => {
	const [loginMutation, { data, loading }] = useMutation(LOGIN);
	const navigate = useNavigate();
	const { refetch } = useContext(AuthContext);

	const login = async (
		email: string,
		password: string,
	): Promise<LoginResponse> => {
		try {
			const response = await loginMutation({
				variables: { email, password },
			});

			const token = response.data?.login;
			if (!token) {
				return {
					success: false,
					message: "Identifiants invalides",
				};
			}

			localStorage.setItem("authToken", token);
			const decoded = jwtDecode<DecodedToken>(token);

			refetch();

			window.location.href = `/${decoded.role.toLowerCase()}`;

			return {
				success: true,
			};
		} catch (error) {
			return {
				success: false,
				message: "Identifiants invalides",
			};
		}
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		navigate("/login");
	};

	return {
		login,
		logout,
		loading,
		data,
	};
};

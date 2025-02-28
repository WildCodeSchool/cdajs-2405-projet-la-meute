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
	const { refetch, user, isLoading } = useContext(AuthContext);

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

			navigate(`/${decoded.role.toLowerCase()}`);

			return new Promise((resolve) => {
				const checkUserData = () => {
					if (user && !isLoading) {
						navigate(`/${decoded.role.toLowerCase()}`);
						resolve({
							success: true,
						});
						return true;
					}
					return false;
				};

				if (checkUserData()) return;

				const interval = setInterval(() => {
					if (checkUserData()) {
						clearInterval(interval);
					}
				}, 100);

				setTimeout(() => {
					clearInterval(interval);
					resolve({
						success: false,
					});
				}, 5000);
			});
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

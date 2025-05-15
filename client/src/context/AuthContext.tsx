import { type ReactNode, createContext, useEffect, useState } from "react";
import { ApolloError } from "@apollo/client";
import type { Owner, Trainer } from "@/types/User";
import client from "@/graphQL/apolloClient";
import { ME } from "@/graphQL/queries/user";
import { jwtDecode } from "jwt-decode";

interface AuthState {
	user: Owner | Trainer | null;
	isLoading: boolean;
	error: ApolloError | null;
	isAuthenticated: boolean;
	role: "owner" | "trainer" | null;
}

interface TokenPayload {
	userId: number;
	role: "owner" | "trainer";
	iat: number;
	exp: number;
}

export interface AuthContextType extends AuthState {
	updateAuth: (newAuthState: Partial<AuthState>) => void;
	logout: () => void;
	refreshUser: () => Promise<void>;
}

const initialAuthState: AuthState = {
	user: null,
	isLoading: false,
	error: null,
	isAuthenticated: false,
	role: null,
};

export const AuthContext = createContext<AuthContextType>({
	...initialAuthState,
	updateAuth: () => {},
	logout: () => {},
	refreshUser: async () => {},
});

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [authState, setAuthState] = useState<AuthState>(initialAuthState);

	useEffect(() => {
		const loadUserData = async () => {
			const token = localStorage.getItem("authToken");

			if (!token) {
				setAuthState((prev) => ({
					...prev,
					isAuthenticated: false,
					isLoading: false,
				}));
				return;
			}

			try {
				setAuthState((prev) => ({ ...prev, isLoading: true }));
				const decoded = jwtDecode<TokenPayload>(token);
				const currentTime = Date.now() / 1000;

				if (decoded.exp < currentTime) {
					localStorage.removeItem("authToken");
					setAuthState((prev) => ({
						...prev,
						isLoading: false,
						isAuthenticated: false,
					}));
					return;
				}

				const isTrainer = decoded.role === "trainer";

				const { data } = await client.query({
					query: ME,
					variables: {
						token,
						isTrainer,
					},
					fetchPolicy: "no-cache",
				});

				if (data.me) {
					setAuthState({
						user: data.me,
						role: decoded.role as "owner" | "trainer",
						isAuthenticated: true,
						isLoading: false,
						error: null,
					});
				} else {
					localStorage.removeItem("authToken");
					setAuthState({
						...initialAuthState,
						isLoading: false,
					});
				}
			} catch (error) {
				localStorage.removeItem("authToken");
				setAuthState({
					...initialAuthState,
					isLoading: false,
					error: error instanceof ApolloError ? error : null,
				});
			}
		};

		loadUserData();
	}, []);

	const updateAuth = (newAuthState: Partial<AuthState>) => {
		setAuthState((prev) => {
			const token = localStorage.getItem("authToken");
			const checkIsAuthenticated =
				newAuthState.isAuthenticated !== undefined
					? newAuthState.isAuthenticated
					: !!token && !!(newAuthState.user || prev.user);
			return {
				...prev,
				...newAuthState,
				isAuthenticated: checkIsAuthenticated,
			};
		});
	};

	const refreshUser = async (): Promise<void> => {
		const token = localStorage.getItem("authToken");
		if (!token) {
			updateAuth({
				user: null,
				role: null,
				isAuthenticated: false,
			});
			return;
		}

		try {
			const decoded = jwtDecode(token) as { role: "owner" | "trainer" };
			const isTrainer = decoded.role === "trainer";

			const { data } = await client.query({
				query: ME,
				variables: { token, isTrainer },
				fetchPolicy: "no-cache",
			});

			if (data.me) {
				updateAuth({
					user: data.me,
					role: decoded.role,
					isAuthenticated: true,
				});
			} else {
				updateAuth({
					user: null,
					role: null,
					isAuthenticated: false,
				});
			}
		} catch (error) {
			updateAuth({
				user: null,
				role: null,
				isAuthenticated: false,
				error: error instanceof ApolloError ? error : null,
			});
		}
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		setAuthState({
			...initialAuthState,
			isLoading: false,
		});
		client.resetStore();
	};

	const value = {
		...authState,
		updateAuth,
		logout,
		refreshUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import { type ReactNode, createContext, useState, useEffect } from "react";
import { type ApolloError, useQuery } from "@apollo/client";
import type { User } from "@/types/User";
import { ME } from "../graphQL/queries/user";

export interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	error: ApolloError | null;
	isAuthenticated: boolean;
	role: "owner" | "trainer";
}

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [token, setToken] = useState<string | null>(null);
	const [isInitialized, setIsInitialized] = useState(false);

	useEffect(() => {
		const storedToken = localStorage.getItem("authToken");
		if (storedToken) {
			setToken(storedToken);
		}
		setIsInitialized(true);
	}, []);

	const { data, loading, error } = useQuery(ME, {
		variables: { token: token ?? "" },
		skip: !token,
	});

	const isAuthenticated = Boolean(token && data?.me);
	const role = data?.me?.role ?? null;

	const value = {
		user: data?.me ?? null,
		isLoading: !isInitialized || loading,
		error: error ?? null,
		isAuthenticated,
		role,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

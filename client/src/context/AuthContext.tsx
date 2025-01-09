import { type ReactNode, createContext } from "react";
import { type ApolloError, useQuery } from "@apollo/client";
import type { User } from "@/types/User";
import { ME } from "../graphQL/queries/user";

export interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	error: ApolloError | null;
}

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const { data, loading, error } = useQuery(ME);

	const value = {
		user: data?.me ?? null,
		isLoading: loading,
		error: error ?? null,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

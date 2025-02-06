import { type ReactNode, createContext, useState, useEffect } from "react";
import { type ApolloError, useQuery } from "@apollo/client";
import { ME } from "../graphQL/queries/user";
import type { Owner, Trainer } from "@/types/User";
import { jwtDecode } from "jwt-decode";

export interface AuthContextType {
	user: Owner | Trainer | null;
	isLoading: boolean;
	error: ApolloError | null;
	isAuthenticated: boolean;
	role: "owner" | "trainer" | null;
	refetch: () => void;
}

interface TokenPayload {
	userId: number;
	role: "owner" | "trainer";
	iat: number;
	exp: number;
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	isLoading: true,
	error: null,
	isAuthenticated: false,
	role: null,
	refetch: () => {},
});

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [token, setToken] = useState<string | null>(null);
	const [isInitialized, setIsInitialized] = useState(false);
	const [tokenRole, setTokenRole] = useState<"owner" | "trainer" | null>(null);

	useEffect(() => {
		try {
			const storedToken = localStorage.getItem("authToken");
			if (storedToken) {
				const decoded = jwtDecode<TokenPayload>(storedToken);
				setTokenRole(decoded.role);
				setToken(storedToken);
			}
		} catch (error) {
			console.error("Error decoding token:", error);
		} finally {
			setIsInitialized(true);
		}
	}, []);

	const { data, refetch, loading, error } = useQuery(ME, {
		variables: {
			token: token ?? "",
			isTrainer: tokenRole === "trainer",
		},
		skip: !token,
	});

	const user = data?.me
		? tokenRole === "trainer"
			? ({
					...data.me,
					siret: data.me.siret,
					company_name: data.me.company_name,
				} as Trainer)
			: ({
					...data.me,
					siret: null,
					company_name: null,
				} as Owner)
		: null;

	const isAuthenticated = Boolean(token && user);
	const role = user?.role ?? null;

	const value = {
		user,
		isLoading: !isInitialized || loading,
		error: error ?? null,
		isAuthenticated,
		role,
		refetch,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

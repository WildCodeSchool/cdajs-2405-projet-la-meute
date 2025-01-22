import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useQuery } from "@apollo/client";
import {
	GET_TRAINER_BY_EMAIL,
	GET_OWNER_BY_EMAIL,
} from "@/graphQL/queries/user";
import type { User } from "@/types/User";

export const useUser = () => {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useUser doit être utilisé dans un AuthProvider");
	}

	const [user, setUser] = useState<User | null>(context.user);

	const role: string | undefined = user?.role;
	const email: string | undefined = user?.email;
	const query = role === "trainer" ? GET_TRAINER_BY_EMAIL : GET_OWNER_BY_EMAIL;

	const { data, loading, error } = useQuery(query, {
		variables: { email: "jane@example.com" },
	});

	useEffect(() => {
		if (data?.getUserByEmail) {
			// biome-ignore lint/suspicious/noConsoleLog: TODO: DELETE
			console.log("we are setting the user in useUser", data.getUserByEmail);
			setUser(data.getUserByEmail);
		} else {
			// biome-ignore lint/suspicious/noConsoleLog: TODO: DELETE
			console.log("user not found", data);
		}
	}, [data]);

	return {
		user,
		loading: context.isLoading || loading,
		error: context.error || error,
		isAuthenticated: context.isAuthenticated,
		role: context.role,
	};
};

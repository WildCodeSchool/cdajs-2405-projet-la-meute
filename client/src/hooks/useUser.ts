import { useContext } from "react";
import { AuthContext, type AuthContextType } from "@/context/AuthContext";
import { useAuth } from "./useAuth";

export const useUser = (): AuthContextType => {
	const context = useContext(AuthContext);
	const { logout } = useAuth();

	if (!context) {
		throw new Error("useUser must be used within an AuthProvider");
	}

	return {
		...context,
		logout,
	};
};

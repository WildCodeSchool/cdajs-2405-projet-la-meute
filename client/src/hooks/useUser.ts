import { useContext } from "react";
import { AuthContext, type AuthContextType } from "@/context/AuthContext";

export const useUser = (): AuthContextType => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useUser must be used within an AuthProvider");
	}

	return context;
};

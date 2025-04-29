import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";
import LoadingIndicator from "@/components/_atoms/LoadingIndicator/LoadingIndicator";

interface AuthGuardProps {
	allowedRoles?: string[];
	children?: React.ReactNode;
}

const AuthGuard = ({ allowedRoles, children }: AuthGuardProps) => {
	const context = useContext(AuthContext);
	const navigate = useNavigate();

	if (context === undefined) {
		throw new Error("AuthContext must be used within an AuthProvider");
	}

	const { role, isLoading, isAuthenticated } = context;

	useEffect(() => {
		if (import.meta.env.VITE_NODE_ENV !== "production") {
			return;
		}

		if (isLoading) return;

		if (
			!isAuthenticated ||
			(allowedRoles && (!role || !allowedRoles.includes(role)))
		) {
			navigate("/login");
		}
	}, [isAuthenticated, isLoading, navigate, role, allowedRoles]);

	if (isLoading) {
		return (
			<main
				style={{
					minHeight: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<LoadingIndicator />
			</main>
		);
	}

	return children ? <>{children}</> : <Outlet />;
};

export default AuthGuard;

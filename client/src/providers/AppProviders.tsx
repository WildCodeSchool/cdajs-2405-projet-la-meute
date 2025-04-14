import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import client from "@/graphQL/apolloClient";

export function AppProviders({ children }: { children: React.ReactNode }) {
	return (
		<ApolloProvider client={client}>
			<AuthProvider>
				{children}
				<ToastContainer theme="colored" />
			</AuthProvider>
		</ApolloProvider>
	);
}

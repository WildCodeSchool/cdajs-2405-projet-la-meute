import { ApolloClient, InMemoryCache } from "@apollo/client";

const useCredentials = import.meta.env.VITE_API_URL === "/grahql";

const client = new ApolloClient({
	uri: import.meta.env.VITE_API_URL || "http://localhost:3200",
	cache: new InMemoryCache(),
	credentials: useCredentials ? "include" : "omit",
});

export default client;

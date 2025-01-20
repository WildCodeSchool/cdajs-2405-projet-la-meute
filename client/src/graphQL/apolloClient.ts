import { ApolloClient, InMemoryCache } from "@apollo/client";

const isProd = import.meta.env.VITE_NODE_ENV === "production";

const client = new ApolloClient({
	uri: isProd ? "/graphql" : "http://localhost:3200",
	cache: new InMemoryCache(),
	credentials: isProd ? "include" : "omit",
});

export default client;

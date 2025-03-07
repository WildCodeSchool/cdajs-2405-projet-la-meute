import { ApolloClient, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const useCredentials = import.meta.env.VITE_API_URL_DEV === "/graphql";

const uploadLink = createUploadLink({
	uri: import.meta.env.VITE_API_URL_DEV || "http://localhost:3200",
	headers: {
		"Apollo-Require-Preflight": "true",
	},
	credentials: useCredentials ? "include" : "omit",
});

const client = new ApolloClient({
	link: uploadLink,
	cache: new InMemoryCache(),
});

export default client;

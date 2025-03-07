import { ApolloClient, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const useCredentials = import.meta.env.VITE_API_URL_DEV === "/graphql";

console.log(
	"const useCredentials = import.meta.env.VITE_API_URL === /graphql;",
	useCredentials,
);
console.log("import.meta.env.VITE_API_URL", import.meta.env.VITE_API_URL);

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

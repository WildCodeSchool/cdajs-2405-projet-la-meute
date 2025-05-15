import client from "@/graphQL/apolloClient";
import { GET_ALL_DOGS_BY_OWNER_ID } from "@/graphQL/queries/dog";

import { jwtDecode } from "jwt-decode";
import { defer } from "react-router-dom";

export async function myDogListLoader() {
	const token = localStorage.getItem("authToken");

	if (!token) {
		return { events: [] };
	}

	try {
		const decoded = jwtDecode<{ role: string; userId: number }>(token);
		const userId = decoded.userId;

		const { data } = await client.query({
			query: GET_ALL_DOGS_BY_OWNER_ID,
			variables: { ownerId: Number(userId) },
			fetchPolicy: "no-cache",
		});

		return defer({
			dogs: data?.getAllDogsByOwnerId || [],
			role: "owner",
		});
	} catch (error) {
		console.error("Error loading dogs data:", error);
		return { events: [], error: true };
	}
}

import client from "@/graphQL/apolloClient";
import {
	GET_ALL_EVENTS_BY_TRAINER_ID,
	GET_ALL_EVENTS_BY_OWNER_ID,
} from "@/graphQL/queries/event";
import type {
	GetAllEventsByTrainerId,
	GetAllEventsByOwnerId,
} from "@/types/Event";
import { jwtDecode } from "jwt-decode";
import { defer } from "react-router-dom";

export async function planningLoader() {
	const token = localStorage.getItem("authToken");

	if (!token) {
		return { events: [] };
	}

	try {
		const decoded = jwtDecode<{ role: string; userId: number }>(token);
		const role = decoded.role;
		const userId = decoded.userId;

		if (!userId) {
			return { events: [] };
		}

		if (role === "trainer") {
			const { data } = await client.query<GetAllEventsByTrainerId>({
				query: GET_ALL_EVENTS_BY_TRAINER_ID,
				variables: { trainerId: Number(userId) },
				fetchPolicy: "no-cache",
			});

			return {
				events: data.getAllEventsByTrainerId,
				role: "trainer",
			};
		}
		const { data } = await client.query<GetAllEventsByOwnerId>({
			query: GET_ALL_EVENTS_BY_OWNER_ID,
			variables: { ownerId: Number(userId) },
			fetchPolicy: "no-cache",
		});

		return defer({
			events: data.getAllEventsByOwnerId,
			role: "owner",
		});
	} catch (error) {
		console.error("Error loading planning data:", error);
		return { events: [], error: true };
	}
}

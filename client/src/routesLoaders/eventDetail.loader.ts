import client from "@/graphQL/apolloClient";
import {
	GET_EVENT_BY_ID,
	GET_DOGS_BY_EVENTS_ID,
} from "@/graphQL/queries/event";
import { type Params, defer } from "react-router-dom";

export async function eventDetailLoader({ params }: { params: Params }) {
	const eventId = Number(params.id);

	if (!eventId) {
		throw new Response("ID de l'événement manquant", { status: 400 });
	}

	const eventPromise = client
		.query({
			query: GET_EVENT_BY_ID,
			variables: { eventId },
			fetchPolicy: "no-cache",
		})
		.then((res) => res.data.getEventById);

	const dogsPromise = client
		.query({
			query: GET_DOGS_BY_EVENTS_ID,
			variables: { eventId },
			fetchPolicy: "no-cache",
		})
		.then((res) => res.data.getDogsByEventsId);

	return defer({
		event: eventPromise,
		dogs: dogsPromise,
	});
}

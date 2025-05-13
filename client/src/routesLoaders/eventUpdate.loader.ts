import { GET_EVENT_BY_ID } from "@/graphQL/queries/event";
import client from "@/graphQL/apolloClient";
import { type Params, defer } from "react-router-dom";

export async function eventUpdateLoader({ params }: { params: Params }) {
	const { id } = params;

	if (!id) {
		throw new Response("Missing event ID", { status: 400 });
	}

	const eventPromise = client
		.query({
			query: GET_EVENT_BY_ID,
			variables: { eventId: Number(id) },
			fetchPolicy: "no-cache",
		})
		.then((res) => res.data.getEventById);

	return defer({
		event: eventPromise,
	});
}

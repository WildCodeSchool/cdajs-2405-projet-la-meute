import { Await, useLoaderData, useParams } from "react-router-dom";
import { Suspense } from "react";
import { useApolloClient } from "@apollo/client";

import EventForm from "@/pages/Event/EventForm/EventForm";
import LoadingIndicator from "@/components/_atoms/LoadingIndicator/LoadingIndicator";
import { GET_EVENT_BY_ID } from "@/graphQL/queries/event";

// Interfaces
import type { Event } from "@/types/Event";

export default function EventUpdate() {
	const { event } = useLoaderData() as {
		event: Promise<Event>;
	};

	const { id } = useParams();
	const client = useApolloClient();

	const refetch = async () => {
		const { data } = await client.query({
			query: GET_EVENT_BY_ID,
			variables: { eventId: Number(id) },
			fetchPolicy: "no-cache",
		});
		return data.getEventById;
	};

	return (
		<Suspense fallback={<LoadingIndicator />}>
			<Await
				resolve={event}
				errorElement={
					<div className="error-message">
						Erreur lors du chargement de l'événement.
					</div>
				}
			>
				{(resolvedEvent: Event) => (
					<EventForm
						mode="update"
						initialData={resolvedEvent}
						refetch={refetch}
					/>
				)}
			</Await>
		</Suspense>
	);
}

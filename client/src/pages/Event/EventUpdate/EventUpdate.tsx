import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import EventForm from "@/pages/Event/EventForm/EventForm";
import { GET_EVENT_BY_ID } from "@/graphQL/queries/event";

export default function EventUpdate() {
	const { id } = useParams();

	const { data, loading, refetch } = useQuery(GET_EVENT_BY_ID, {
		variables: {
			eventId: Number(id),
		},
	});

	if (loading) {
		return <p>loading...</p>;
	}

	return (
		<EventForm
			mode="update"
			initialData={data.getEventById}
			refetch={refetch}
		/>
	);
}

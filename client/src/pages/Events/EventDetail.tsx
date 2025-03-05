import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EVENT_BY_ID } from "@/graphQL/queries/event";
import Service from "@/components/_atoms/Service/Service";
import type { ServiceType } from "@/types/Service";
import IdCard from "@/components/_molecules/Card/IdCard";

function EventDetail() {
	const { id } = useParams();
	const { data, loading, error } = useQuery(GET_EVENT_BY_ID, {
		variables: { eventId: Number(id) },
	});

	if (loading) return <div>Chargement de l'événement...</div>;
	if (error) return <div>Erreur : {error.message}</div>;

	const event = data?.getEventById;
	console.log("event", event);

	return (
		<div className="event-detail">
			<h1>{event.title}</h1>
			<div className="event-info">
				<p>Description : {event.description}</p>
				<p>
					Date :{" "}
					{new Date(event.startDate).toLocaleDateString("fr-FR", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</p>
				<p>Heure de début : {event.startDate}</p>
				<p>Heure de fin : {event.endDate}</p>
				<p>Taille max du groupe : {event.group_max_size}</p>
				<div className="event-location">
					<p>Latitude : {event.location.latitude}</p>
					<p>Longitude : {event.location.longitude}</p>
				</div>
				<p>Prix : {event.price}</p>
				<div>
					{event.services.map((service: ServiceType) => (
						<Service service={service} key={service.id} />
					))}
				</div>
				<IdCard type="owner" data={event.trainer} ownerView />
			</div>
			<div>
				<a href="">Supprimer</a>
				<br />
				<br />
				<a href="">Modifier l'événement</a>
			</div>
		</div>
	);
}

export default EventDetail;

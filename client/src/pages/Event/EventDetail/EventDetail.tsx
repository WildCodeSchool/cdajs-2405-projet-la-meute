import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Service from "@/components/_atoms/Service/Service";
import AddressSearchMap from "@/components/_molecules/AdressSearchMap/AdressSearchMap";
import ParticipantsOverview from "@/components/_molecules/ParticipantsOverview/ParticipantsOverview";
import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader.tsx";
import {
	GET_DOGS_BY_EVENTS_ID,
	GET_EVENT_BY_ID,
} from "@/graphQL/queries/event";
import { useDateFormatter } from "@/hooks/useDateFormatter";
import { useUser } from "@/hooks/useUser";
import type { Location } from "@/types/Event";
import type { ServiceType } from "@/types/Service";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventActionsByRole from "./Controls/EventActionsByRole";
import "./EventDetail.scss";

function EventDetail() {
	const { id } = useParams();
	const eventId = id ? Number(id) : null;
	const { user } = useUser();
	const { extractDate, extractTime } = useDateFormatter();
	const [availableSlots, setAvailableSlots] = useState(0);

	const { data, loading, error } = useQuery(GET_EVENT_BY_ID, {
		variables: { eventId },
		skip: !id,
		fetchPolicy: "no-cache",
	});

	const { data: dataDogs } = useQuery(GET_DOGS_BY_EVENTS_ID, {
		variables: { eventId },
		skip: !id,
		fetchPolicy: "no-cache",
	});

	const event = data?.getEventById;
	const dogs = dataDogs?.getDogsByEventsId || [];

	useEffect(() => {
		if (data?.getEventById) {
			const participantsCount =
				data.getEventById.participation &&
				Array.isArray(data.getEventById.participation)
					? data.getEventById.participation.length
					: 0;

			const slots = Math.max(
				0,
				data.getEventById.group_max_size - participantsCount,
			);

			setAvailableSlots(slots);
		}
	}, [data]);

	// States loading management
	if (!user) return <div>Chargement de l'utilisateur...</div>;
	if (loading) return <div>Chargement de l'événement...</div>;
	if (error) return <div>Erreur : {error.message}</div>;
	if (!data?.getEventById || !dataDogs?.getDogsByEventsId)
		return <div>Aucun événement trouvé.</div>;

	return (
		<>
			<PlanningHeader
				title="Planning"
				buttonLabel="event"
				href="/trainer/planning/event/new"
			/>
			<section className="eventDetail__section">
				<div className="eventDetail__event">
					<div className="eventDetail__event--card">
						<div className="eventDetail__event--title">{event.title}</div>
						<div className="eventDetail__event--service">
							{event.services.map((service: ServiceType) => (
								<Service service={service} key={service.id} />
							))}
						</div>
						{user?.role === "owner" && (
							<span className="createEvent__event eventDetail__margin">
								<label className="eventDetail__leftSlot">
									Nombre de place(s) disponible(s) restante(s)
									<input
										className="createEvent__input"
										type="string"
										value={availableSlots > 0 ? availableSlots : "Complet"}
										disabled={true}
									/>
								</label>
							</span>
						)}
						<span className="createEvent__event createEvent__event--dates eventDetail__margin">
							<label className="createEvent__event--date">
								Date de l'évènement
								<input
									className="createEvent__input"
									type="date"
									defaultValue={extractDate(event.startDate)}
									disabled={true}
								/>
							</label>
							<label className="createEvent__event--startTime">
								Heure de début
								<input
									className="createEvent__input"
									type="time"
									defaultValue={extractTime(event.startDate)}
									disabled={true}
								/>
							</label>
							<label className="createEvent__event--endDate">
								Heure de fin
								<input
									className="createEvent__input"
									type="time"
									defaultValue={extractTime(event.endDate)}
									disabled={true}
								/>
							</label>
						</span>
						<TextInput
							className="createEvent__event eventDetail__description eventDetail__margin"
							label="Description"
							inputType="textarea"
							name="description"
							type="description"
							value={event.description}
							onChange={() => ""}
						/>
						<AddressSearchMap
							markerLocation={event.location as Location}
							display
						/>
						<EventActionsByRole />
					</div>
				</div>

				<div className="eventDetail__participation">
					{user?.role === "trainer" ? (
						<ParticipantsOverview
							title="Participants"
							type="dogs"
							event={event}
							dogs={dogs}
							context="event"
						/>
					) : (
						<ParticipantsOverview
							title="Éducateur"
							type="trainer"
							event={event}
							context="event"
						/>
					)}
				</div>
			</section>
		</>
	);
}

export default EventDetail;

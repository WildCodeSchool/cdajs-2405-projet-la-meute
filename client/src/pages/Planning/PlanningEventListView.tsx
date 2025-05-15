import { CalendarWithClock } from "@/assets/icons/calendar-with-clock";
import { MapPin } from "@/assets/icons/map-pin";
import Service from "@/components/_atoms/Service/Service";
import DogBubbles from "@/components/_atoms/DogsBubbles/DogsBubbles";
import { formatEventDateTime } from "@/helpers/formatEventDate";
import type { ServiceType } from "@/types/Service";
import type { EventContentArg } from "@fullcalendar/core";

const PlanningEventsListView: React.FC<{ arg: EventContentArg }> = ({
	arg,
}) => {
	if (!arg.event.extendedProps) {
		return <p>Informations de l'événement incomplètes</p>;
	}

	return (
		<section className="event__section--global">
			<div className="event-content-list">
				<div className="event-card">
					<div className="event-title">{arg.event.title}</div>

					<div className="eventDetail__event--service">
						{arg.event.extendedProps.services.map(
							(service: ServiceType, index: number) => (
								<Service
									service={service}
									key={service.id || `service-${index}`}
								/>
							),
						)}
					</div>

					<div className="event-date-and-time">
						<CalendarWithClock className="event__icons" />
						{arg.event.start && arg.event.end
							? formatEventDateTime(arg.event.start, arg.event.end)
							: "Date non disponible"}
					</div>

					<div className="event-location">
						<MapPin className="event__icons" />
						{arg.event.extendedProps.location.latitude},
						{arg.event.extendedProps.location.longitude}
					</div>
				</div>
			</div>

			<div className="event__div--participation">
				<div className="participants-title">Participants</div>
				<div className="participants-wrapper">
					<DogBubbles
						dogs={arg.event.extendedProps.dogs}
						maxSize={arg.event.extendedProps.group_max_size}
					/>
				</div>
			</div>
		</section>
	);
};

export default PlanningEventsListView;

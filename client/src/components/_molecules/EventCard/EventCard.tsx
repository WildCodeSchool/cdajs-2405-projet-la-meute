import { CalendarWithClock } from "@/assets/icons/calendar-with-clock";
import { MapPin } from "@/assets/icons/map-pin";
import type { Event } from "@/types/Event";

interface EventCardProps {
	event: Event;
}

function EventCard({ event }: EventCardProps) {
	console.log("event in EventCard", event);

	// Function to formate the date with startDate and endDate
	const formatEventDateTime = (startDate: Date, endDate: Date) => {
		const formatDate = (date: Date) => {
			const days = [
				"dimanche",
				"lundi",
				"mardi",
				"mercredi",
				"jeudi",
				"vendredi",
				"samedi",
			];
			const day = days[date.getDay()];
			const dayNum = date.getDate().toString().padStart(2, "0");
			const month = (date.getMonth() + 1).toString().padStart(2, "0");
			const year = date.getFullYear();

			return `${day} ${dayNum}/${month}/${year}`;
		};

		const formatTime = (date: Date) => {
			const hours = date.getHours().toString().padStart(2, "0");
			const minutes = date.getMinutes().toString().padStart(2, "0");

			return `${hours}h${minutes}`;
		};

		return `Le ${formatDate(new Date(startDate))} de ${formatTime(new Date(startDate))} jusqu'à ${formatTime(new Date(endDate))}`;
	};
	return (
		<section className="event__section--global">
			<div className="event-content-list">
				<div className="event-card">
					<div className="event-title">{event.title}</div>
					<div className="eventDetail__event--service">
						{/* 						{event.services.map((service: ServiceType, index: number) => (
							<Service
								service={service}
								key={service.id || `service-${index}`}
							/>
						))} */}
					</div>
					<div className="event-date-and-time">
						<CalendarWithClock className="event__icons" />
						{formatEventDateTime(event.startDate, event.endDate)}
					</div>
					<div className="event-location">
						<MapPin className="event__icons" />
						{event.location.latitude},{event.location.longitude}
					</div>
				</div>
			</div>
		</section>
	);
}

export default EventCard;

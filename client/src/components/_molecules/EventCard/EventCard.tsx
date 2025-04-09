import { CalendarWithClock } from "@/assets/icons/calendar-with-clock";
import { MapPin } from "@/assets/icons/map-pin";
import Service from "@/components/_atoms/Service/Service";
import type { ServiceType } from "@/types/Service";
import DogBubbles from "../DogsBubbles/DogsBubbles";
import { useNavigate } from "react-router-dom";
import type { Dog } from "@/types/Dog";
import type { Event } from "@/types/Event";

interface EventCardProps {
	event: Event;
}

function EventCard({ event }: EventCardProps) {
	const navigate = useNavigate();

	const handleDogClick = (dog: Partial<Dog>) => {
		navigate(`/trainer/dogs/${dog.id}`);
	};

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

		return `Le ${formatDate(startDate)} de ${formatTime(startDate)} jusqu'à ${formatTime(endDate)}`;
	};
	return (
		<section className="event__section--global">
			<div className="event-content-list">
				<div className="event-card">
					<div className="event-title">{event.title}</div>
					<div className="eventDetail__event--service">
						{event.services.map((service: ServiceType, index: number) => (
							<Service
								service={service}
								key={service.id || `service-${index}`}
							/>
						))}
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
			<div className="event__div--participation">
				<div className="participants-title">Participants</div>
				<div className="participants-wrapper">
					<DogBubbles
						dogs={event}
						maxSize={event.group_max_size}
						onDogClick={handleDogClick}
					/>
				</div>
			</div>
		</section>
	);
}

export default EventCard;

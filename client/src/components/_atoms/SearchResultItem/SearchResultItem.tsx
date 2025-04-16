import "./SearchResultItem.scss";

import { Link } from "react-router-dom";
import { useImageUrl } from "@/hooks/useImageUrl";
import { useUser } from "@/hooks/useUser";
import { formatEventDateTime } from "@/helpers/formatEventDate";

import type { Owner, Trainer } from "@/types/User";
import type { SearchableEntity } from "@/types/Search";
import type { Dog } from "@/types/Dog";
import type { Event } from "@/types/Event";

import { CalendarWithClock } from "@/assets/icons/calendar-with-clock";
import { MapPin } from "@/assets/icons/map-pin";

import Service from "@/components/_atoms/Service/Service";
import DogBubbles from "@/components/_atoms/DogsBubbles/DogsBubbles";

function SearchResultItem({ entity }: { entity: SearchableEntity }) {
	const { role } = useUser();
	const type = entity.__typename.toLowerCase();

	if (type === "owner") {
		const owner = entity as unknown as Owner & { dogs: Dog[] };
		return (
			<Link to={`/owner/${owner.id}`} className="searchResultItem">
				<span className="searchResultItem__owner">
					<img
						src={useImageUrl(owner.avatar)}
						alt={`Avatar de ${owner.firstname} ${owner.lastname}`}
						className="searchResultItem__owner--avatar"
					/>
					<span className="searchResultItem__owner--infos">
						<p className="searchResultItem__owner--name">
							{owner.firstname} {owner.lastname}
						</p>
						<p className="searchResultItem__owner--email">{owner.email}</p>
						<p className="searchResultItem__owner--location">
							{owner.postal_code} {owner.city}
						</p>
						<p className="searchResultItem__owner--phone">
							{owner.phone_number}
						</p>
					</span>
				</span>
				<span className="searchResultItem__owner--dogs">
					{owner.dogs.map((dog) => (
						<Link
							to={`/dog/${dog.id}`}
							key={dog.id}
							className="searchResultItem__owner--dog"
						>
							<img
								src={useImageUrl(dog.picture)}
								alt={dog.name}
								className="dog__bubble"
							/>
							<p className="searchResultItem__owner--dog--name">{dog.name}</p>
						</Link>
					))}
				</span>
			</Link>
		);
	}

	// default search result is of type Event
	const event = entity as unknown as Event & { trainer: Trainer };
	const dogs = event.participation.map((participation) => participation.dog);
	return (
		<Link
			to={`/${role}/planning/events/${entity.id}`}
			className="searchResultItem"
		>
			<span className="searchResultItem__event">
				<h2 className="searchResultItem__event--title">{event.title}</h2>
				<span className="searchResultItem__event--trainer">
					<img
						src={useImageUrl(event.trainer.avatar)}
						alt={`Avatar de ${event.trainer.firstname} ${event.trainer.lastname}`}
						className="searchResultItem__event--avatar"
					/>
					<p>
						{event.trainer.firstname} {event.trainer.lastname}
					</p>
				</span>
				<p>{event.description}</p>
				<span className="searchResultItem__event--services">
					{event.services.map((service) => (
						<Service key={service.id} service={service} />
					))}
				</span>
				<span className="searchResultItem__event--date">
					<CalendarWithClock className="searchResultItem__event--icon" />
					{formatEventDateTime(
						new Date(event.startDate),
						new Date(event.endDate),
					)}
				</span>
				<span className="searchResultItem__event--location">
					<MapPin className="searchResultItem__event--icon" />
					{event.location.latitude},{event.location.longitude}
				</span>
			</span>
			<span className="searchResultItem__event--dogs">
				<DogBubbles dogs={dogs} maxSize={event.group_max_size} />
			</span>
		</Link>
	);
}

export default SearchResultItem;

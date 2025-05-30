import { CalendarWithClock } from "@/assets/icons/calendar-with-clock";
import { MapPin } from "@/assets/icons/map-pin";
import DogBubbles from "@/components/_atoms/DogsBubbles/DogsBubbles";
import Service from "@/components/_atoms/Service/Service";
import { formatEventDateTime } from "@/helpers/formatEventDate";
import { useImageUrl } from "@/hooks/useImageUrl";
import type { Dog } from "@/types/Dog";
import type { Event } from "@/types/Event";
import type { SearchableEntity } from "@/types/Search";
import type { Owner, Trainer } from "@/types/User";
import { Link } from "react-router-dom";
import "./SearchResultItem.scss";

function SearchResultItem({ entity }: { entity: SearchableEntity }) {
	const type = entity.__typename.toLowerCase();

	if (type === "owner") {
		const owner = entity as unknown as Owner & { dogs: Dog[] };

		return (
			<article className="searchResultItem searchResultItem__button">
				<Link
					className="searchResultItem__owner"
					to={`/profile/view/owner/${owner.id}`}
				>
					<img
						src={useImageUrl(owner.avatar)}
						alt={`Avatar de ${owner.firstname} ${owner.lastname}`}
						className="searchResultItem__owner--avatar"
					/>
					<span className="searchResultItem__owner--infos">
						<p className="searchResultItem__owner--name">
							{owner.firstname} {owner.lastname}
						</p>
						<p className="searchResultItem__owner--email">
							{owner.email.toLowerCase()}
						</p>
						<p className="searchResultItem__owner--location">
							{owner.postal_code} {owner.city}
						</p>
						<p className="searchResultItem__owner--phone">
							{owner.phone_number}
						</p>
					</span>
				</Link>

				<span className="searchResultItem__owner--dogs">
					{owner.dogs.map((dog) => (
						<Link
							key={dog.id}
							to={`/profile/view/dog/${dog.id}`}
							className="searchResultItem__owner--dog"
							aria-label={`Voir le profil de ${dog.name}`}
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
			</article>
		);
	}

	// default search result is of type Event
	const event = entity as Event & { trainer: Trainer };
	const dogs = event.participation.map((participation) => participation.dog);

	return (
		<article className="searchResultItem">
			<Link to={`/event/${entity.id}`} className="searchResultItem__event">
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
					{event.location.city}
				</span>
			</Link>
			<span className="searchResultItem__event--dogs">
				<DogBubbles dogs={dogs} maxSize={event.group_max_size} />
			</span>
		</article>
	);
}

export default SearchResultItem;

import "./SearchResultItem.scss";
import type { SearchableEntity } from "@/types/Search";
import IdCard from "@/components/_molecules/Card/IdCard";
import type { Owner } from "@/types/User";
import type { Dog } from "@/types/Dog";
import EventCard from "@/components/_molecules/EventCard/EventCard";
import type { Event } from "@/types/Event";

function SearchResultItem({ entity }: { entity: SearchableEntity }) {
	const type = entity.__typename.toLowerCase();

	if (type === "owner") {
		const dogs = (entity as Owner & { dogs: Dog[] }).dogs;
		return (
			<div className="searchResultItem__owner">
				<IdCard type="owner" data={entity as Owner} ownerView={false} />
				<ul>
					{dogs.map((dog: Dog) => (
						<IdCard
							key={dog.id}
							type="dog"
							data={dog as Dog}
							ownerView={false}
						/>
					))}
				</ul>
			</div>
		);
	}

	return <EventCard event={entity as Event} />;
}

export default SearchResultItem;

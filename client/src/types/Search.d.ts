import type { Dog } from "./Dog";
import type { Event } from "./Event";
import type { Owner, Trainer } from "./User";

export interface SearchIndex {
	id: number;
	entity: Dog | Event | Trainer | Owner;
}

export type SearchableEntity =
	| (Dog & { __typename: "Dog" })
	| (Event & { __typename: "Event" })
	| (Trainer & { __typename: "Trainer" })
	| (Owner & { __typename: "Owner" });

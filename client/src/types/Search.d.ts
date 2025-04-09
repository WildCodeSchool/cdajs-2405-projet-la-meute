import type { Dog } from "./Dog";
import type { Event } from "./Event";
import type { Owner, Trainer } from "./User";

export interface SearchIndex {
	id: number;
	entity: Dog | Event | Trainer | Owner;
}

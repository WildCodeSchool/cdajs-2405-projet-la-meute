import type { Dog } from "./Dog";

export interface Location {
	latitude: number;
	longitude: number;
}

export interface LocationType {
	latitude: number;
	longitude: number;
}

export interface Event {
	id: number;
	date: string;
	title: string;
	description: string;
	group_max_size: number;
	location: Location;
	price: number;
	startDate: Date;
	endDate: Date;
	participation: Participation[];
	services: ServiceType[];
	trainer?: Trainer | null;
}

export interface Participation {
	dog: Dog;
}

export interface GetAllEventsByTrainerId {
	getAllEventsByTrainerId: Event[];
}

export interface GetAllEventsByOwnerId {
	getAllEventsByOwnerId: Event[];
	id: number;
	date: string;
	title: string;
	description: string;
	group_max_size: number;
	location: Location;
	price: number;
	startDate: Date;
	endDate: Date;
}

export interface GetDogsByEventsId {
	getDogsByEventsId: Dog[];
}

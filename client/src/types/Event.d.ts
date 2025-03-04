export interface Location {
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
}

export interface GetAllEventsData {
	getAllEvents: Event[];
}

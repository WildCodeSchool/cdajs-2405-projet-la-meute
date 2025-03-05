import { Arg, Query, Resolver, Mutation } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Event } from "../entities/Event";
import { Service } from "../entities/Service";
import { Trainer } from "../entities/Trainer";

import "dotenv/config";
import type { Coordinates } from "../entities/Coordinates";

import { LocationInput } from "../types/inputTypes";

const eventRepository = dataSource.getRepository(Event);
const trainerRepository = dataSource.getRepository(Trainer);
const serviceRepository = dataSource.getRepository(Service);

@Resolver()
export class EventResolver {
	// Get all events
	@Query(() => [Event])
	async getAllEvents(): Promise<Event[]> {
		const events: Event[] = await eventRepository.find();
		return events;
	}

	// Get one event by id
	@Query(() => Event)
	async getEventById(@Arg("eventId") eventId: number): Promise<Event> {
		const eventsId: Event = await eventRepository.findOneOrFail({
			where: { id: eventId },
		});
		return eventsId;
	}

	// Create event
	@Mutation(() => Event)
	async createEvent(
		@Arg("trainerId") trainerId: number,
		@Arg("serviceId") serviceId: number,
		@Arg("date") date: Date,
		@Arg("title") title: string,
		@Arg("description") description: string,
		@Arg("location") location: LocationInput,
		@Arg("group_max_size") group_max_size: number,
		@Arg("price") price: number,
		@Arg("startDate") startDate: Date,
		@Arg("endDate") endDate: Date,
	): Promise<Event> {
		const trainer = await trainerRepository.findOneBy({ id: trainerId });
		if (!trainer) {
			throw new Error(`Trainer with ID ${trainerId} not found`);
		}

		const event = new Event(
			trainer,
			serviceId,
			date,
			title,
			description,
			location,
			group_max_size,
			price,
			startDate,
			endDate,
		);

		return await eventRepository.save(event);
	}

	// Update event
	@Mutation(() => Event)
	async updateEvent(
		@Arg("eventId") eventId: number,
		@Arg("trainerId") trainerId: number,
		@Arg("serviceId") serviceId: number,
		@Arg("date") date: Date,
		@Arg("title") title: string,
		@Arg("description") description: string,
		@Arg("location", () => LocationInput) location: LocationInput,
		@Arg("group_max_size") group_max_size: number,
		@Arg("price") price: number,
		@Arg("startDate") startDate: Date,
		@Arg("endDate") endDate: Date,
	): Promise<Event> {
		const event = await eventRepository.findOne({
			where: {
				id: eventId,
				trainer: { id: trainerId },
			},
			relations: ["trainer"],
		});

		if (!event) {
			throw new Error(`Event with ID ${eventId} not found`);
		}

		if (serviceId) event.serviceId = serviceId;
		if (date) event.date = date;
		if (title) event.title = title;
		if (description) event.description = description;
		if (location) event.location = location;
		if (group_max_size) event.group_max_size = group_max_size;
		if (price) event.price = price;
		if (startDate) event.startDate = startDate;
		if (endDate) event.endDate = endDate;

		return await eventRepository.save(event);
	}

	// Delete event
	@Mutation(() => Boolean)
	async deleteEvent(@Arg("eventId") eventId: number): Promise<boolean> {
		const event = await eventRepository.findOne({
			where: {
				id: eventId,
			},
		});

		if (!event) {
			throw new Error(`Event with ID ${eventId} not found`);
		}

		const result = await eventRepository.delete(eventId);
		return result.affected ? result.affected > 0 : false;
	}
}

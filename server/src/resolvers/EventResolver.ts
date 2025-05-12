import { Arg, Query, Resolver, Mutation } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Event } from "../entities/Event";
import { Service } from "../entities/Service";
import { Trainer } from "../entities/Trainer";
import { Participation } from "../entities/Participation";
import { Dog } from "../entities/Dog";

import { LocationInput } from "../types/inputTypes";

import { In } from "typeorm";

import "dotenv/config";

const eventRepository = dataSource.getRepository(Event);
const trainerRepository = dataSource.getRepository(Trainer);
const serviceRepository = dataSource.getRepository(Service);
const participationRepository = dataSource.getRepository(Participation);
const dogRepository = dataSource.getRepository(Dog);

@Resolver()
export class EventResolver {
	// Get all events (with their services)
	@Query(() => [Event])
	async getAllEvents(): Promise<Event[]> {
		const events: Event[] = await eventRepository.find({
			relations: ["trainer", "services", "participation", "participation.dog"],
		});
		return events;
	}

	// Get one event by id (with services)
	@Query(() => Event)
	async getEventById(@Arg("eventId") eventId: number): Promise<Event> {
		const event: Event = await eventRepository.findOneOrFail({
			where: { id: eventId },
			relations: ["trainer", "services", "participation.dog"],
		});
		return event;
	}

	// Get all events by trainer_id
	@Query(() => [Event])
	async getAllEventsByTrainerId(
		@Arg("trainerId") trainerId: number,
	): Promise<Event[]> {
		const eventsByTrainerId = await eventRepository.find({
			where: { trainer: { id: trainerId } },
			relations: ["trainer", "services", "participation.dog"],
		});
		return eventsByTrainerId;
	}

	// Get all events by owner_id
	@Query(() => [Event])
	async getAllEventsByOwnerId(
		@Arg("ownerId") ownerId: number,
	): Promise<Event[]> {
		// Owners has events by the participation of their dog so we need to map on dog first
		const dogsOfOwner = await dogRepository.find({
			where: { owner: { id: ownerId } },
		});
		// We get dog.id to find participation on event
		const dogIds = dogsOfOwner.map((dog) => dog.id);
		// We search events where dog participate
		const eventsByOwnerId = await eventRepository.find({
			where: {
				participation: {
					dog: {
						// In() is operator of TypeORM to find values in array
						id: In(dogIds),
					},
				},
			},
			relations: ["trainer", "services", "participation.dog"],
		});
		return eventsByOwnerId;
	}

	// Get dog_id by event_id
	@Query(() => [Dog])
	async getDogsByEventsId(
		@Arg("eventId") eventId: number,
	): Promise<Dog[] | null> {
		const dogsByEventsId = await participationRepository.find({
			where: { event: { id: eventId } },
			relations: ["dog"],
		});

		const dogs = dogsByEventsId
			.map((participation) => participation.dog)
			.filter((dog): dog is Dog => dog !== undefined);

		return dogs || [];
	}

	// Create event
	@Mutation(() => Event)
	async createEvent(
		@Arg("endDate") endDate: Date,
		@Arg("startDate") startDate: Date,
		@Arg("price") price: number,
		@Arg("group_max_size") group_max_size: number,
		@Arg("location") location: LocationInput,
		@Arg("description") description: string,
		@Arg("title") title: string,
		@Arg("trainerId") trainerId: number,
		@Arg("serviceIds", () => [Number], { nullable: true })
		serviceIds?: number[],
	): Promise<Event> {
		const trainer = await trainerRepository.findOneBy({ id: trainerId });
		if (!trainer) {
			throw new Error(`Trainer with ID ${trainerId} not found`);
		}

		let services: Service[] = [];
		if (serviceIds && serviceIds.length > 0) {
			services = await serviceRepository.findByIds(serviceIds);
		}

		const event = new Event(
			trainer,
			services,
			title,
			description,
			location,
			startDate,
			endDate,
			group_max_size,
			price,
		);

		return await eventRepository.save(event);
	}

	// Update event
	@Mutation(() => Event)
	async updateEvent(
		@Arg("eventId") eventId: number,
		@Arg("trainerId") trainerId: number,
		@Arg("serviceIds", () => [Number], { nullable: true })
		serviceIds?: number[],
		@Arg("title", { nullable: true }) title?: string,
		@Arg("description", { nullable: true }) description?: string,
		@Arg("location", () => LocationInput, { nullable: true })
		location?: LocationInput,
		@Arg("group_max_size", { nullable: true }) group_max_size?: number,
		@Arg("price", { nullable: true }) price?: number,
		@Arg("startDate", { nullable: true }) startDate?: Date,
		@Arg("endDate", { nullable: true }) endDate?: Date,
	): Promise<Event> {
		const event = await eventRepository.findOne({
			where: {
				id: eventId,
				trainer: { id: trainerId },
			},
			relations: ["trainer", "services"],
		});

		if (!event) {
			throw new Error(`Event with ID ${eventId} not found`);
		}

		if (serviceIds) {
			if (serviceIds.length > 3) {
				throw new Error("Un événement ne peut pas avoir plus de 3 services.");
			}
			event.services = await serviceRepository.findByIds(serviceIds);
		}

		if (title) event.title = title;
		if (description) event.description = description;
		if (location) event.location = location;
		if (group_max_size !== undefined) event.group_max_size = group_max_size;
		if (price !== undefined) event.price = price;
		if (startDate) event.startDate = startDate;
		if (endDate) event.endDate = endDate;

		await eventRepository.save(event);

		return await eventRepository.findOneOrFail({
			where: { id: event.id },
			relations: ["trainer", "services"],
		});
	}

	// Delete event
	@Mutation(() => Boolean)
	async deleteEvent(@Arg("eventId") eventId: number): Promise<boolean> {
		const event = await eventRepository.findOne({ where: { id: eventId } });
		if (!event) {
			throw new Error(`Event with ID ${eventId} not found`);
		}

		const result = await eventRepository.delete(eventId);
		return result.affected ? result.affected > 0 : false;
	}
}

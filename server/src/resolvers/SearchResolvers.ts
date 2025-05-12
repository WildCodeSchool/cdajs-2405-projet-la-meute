import { Resolver, Query, Arg } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";

import { search } from "../services/search";
import { SearchIndex } from "../entities/SearchIndex";

import { EntityDetails } from "../types/entityDetailsTypes";

import { Event } from "../entities/Event";
import { Dog } from "../entities/Dog";
import { Trainer } from "../entities/Trainer";
import { Owner } from "../entities/Owner";
import { Favorite } from "../entities/Favorite";
import { Participation } from "../entities/Participation";
import { Service } from "../entities/Service";
import { In } from "typeorm";

const entityMap = {
	event: Event,
	dog: Dog,
	trainer: Trainer,
	owner: Owner,
	favorite: Favorite,
	participation: Participation,
	service: Service,
} as const;

@Resolver()
export class SearchResolvers {
	@Query(() => [SearchIndex])
	// this first search() is the name of the query
	async search(@Arg("query") query: string): Promise<Partial<SearchIndex>[]> {
		const results = await search(query); // this search() is the one imported from the service

		return results.map(({ id, entity_type, entity_id }) => ({
			id,
			entity_type,
			entity_id,
		}));
	}

	@Query(() => EntityDetails, { nullable: true })
	async GetEntityDetails(
		@Arg("id") id: number,
		@Arg("entityType") entityType: string,
	): Promise<EntityDetails | null> {
		if (!(entityType in entityMap)) return null;

		const repository = dataSource.getRepository(entityType);
		const entity = await repository.findOne({ where: { id } });

		if (!entity) return null;

		return {
			type: entityType,
			entity: entity as
				| Event
				| Dog
				| Trainer
				| Owner
				| Favorite
				| Participation
				| Service,
		};
	}

	@Query(() => [EntityDetails])
	async searchEventsByTrainerId(
		@Arg("query") query: string,
		@Arg("trainerId") trainerId: number,
	): Promise<EntityDetails[]> {
		const searchResults = await search(query);
		const eventResults = searchResults.filter(
			(result) => result.entity_type === "event",
		);

		if (eventResults.length === 0) {
			return [];
		}

		const eventIds = eventResults.map((result) => result.entity_id);

		const eventRepository = dataSource.getRepository(Event);
		const trainerEvents = await eventRepository.find({
			where: {
				id: In(eventIds),
				trainer: { id: trainerId },
			},
			relations: ["trainer", "services", "participation", "participation.dog"],
		});

		return trainerEvents.map((event) => ({
			type: "event",
			entity: event,
		}));
	}

	@Query(() => [EntityDetails])
	async searchAvailableEvents(
		@Arg("query") query: string,
		@Arg("searchField", { nullable: true }) searchField?: string,
	): Promise<EntityDetails[]> {
		if (!query.trim()) {
			const queryBuilder = dataSource
				.getRepository(Event)
				.createQueryBuilder("event")
				.andWhere((qb) => {
					const subQuery = qb
						.subQuery()
						.select("COUNT(participation.id)")
						.from("participation", "participation")
						.where("participation.event_id = event.id")
						.getQuery();
					return `(${subQuery}) < event.group_max_size`;
				})
				.leftJoinAndSelect("event.trainer", "trainer")
				.leftJoinAndSelect("event.services", "services")
				.leftJoinAndSelect("event.participation", "participation")
				.leftJoinAndSelect("participation.dog", "dog")
				.orderBy("event.startDate", "DESC");

			const availableEvents = await queryBuilder.getMany();

			return availableEvents.map((event) => ({
				type: "event",
				entity: event,
			}));
		}

		if (searchField === "trainer") {
			const searchResults = await search(query);
			const trainerResults = searchResults.filter(
				(result) => result.entity_type === "trainer",
			);

			if (trainerResults.length === 0) {
				return [];
			}

			const trainerIds = trainerResults.map((result) => result.entity_id);

			const queryBuilder = dataSource
				.getRepository(Event)
				.createQueryBuilder("event")
				.where("event.trainer_id IN (:...trainerIds)", { trainerIds })

				.andWhere((qb) => {
					const subQuery = qb
						.subQuery()
						.select("COUNT(participation.id)")
						.from("participation", "participation")
						.where("participation.event_id = event.id")
						.getQuery();
					return `(${subQuery}) < event.group_max_size`;
				})

				.leftJoinAndSelect("event.trainer", "trainer")
				.leftJoinAndSelect("event.services", "services")
				.leftJoinAndSelect("event.participation", "participation")
				.leftJoinAndSelect("participation.dog", "dog")
				.orderBy("event.startDate", "DESC");

			const availableEvents = await queryBuilder.getMany();

			return availableEvents.map((event) => ({
				type: "event",
				entity: event,
			}));
		}

		const searchResults = await search(query);
		const eventResults = searchResults.filter(
			(result) => result.entity_type === "event",
		);

		if (eventResults.length === 0) {
			return [];
		}

		const eventIds = eventResults.map((result) => result.entity_id);

		let queryBuilder = dataSource
			.getRepository(Event)
			.createQueryBuilder("event")
			.where("event.id IN (:...eventIds)", { eventIds })
			.andWhere((qb) => {
				const subQuery = qb
					.subQuery()
					.select("COUNT(participation.id)")
					.from("participation", "participation")
					.where("participation.event_id = event.id")
					.getQuery();
				return `(${subQuery}) < event.group_max_size`;
			});

		if (searchField === "title") {
			queryBuilder = queryBuilder.andWhere(
				"LOWER(event.title) LIKE LOWER(:searchTerm)",
				{ searchTerm: `%${query.toLowerCase()}%` },
			);
		} else if (searchField === "description") {
			queryBuilder = queryBuilder.andWhere(
				"LOWER(event.description) LIKE LOWER(:searchTerm)",
				{ searchTerm: `%${query.toLowerCase()}%` },
			);
		} else if (searchField === "startDate") {
			queryBuilder = queryBuilder.andWhere(
				"TO_CHAR(event.startDate, 'YYYY-MM-DD') LIKE :searchTerm",
				{ searchTerm: `%${query}%` },
			);
		}

		queryBuilder = queryBuilder
			.leftJoinAndSelect("event.trainer", "trainer")
			.leftJoinAndSelect("event.services", "services")
			.leftJoinAndSelect("event.participation", "participation")
			.leftJoinAndSelect("participation.dog", "dog")
			.orderBy("event.startDate", "DESC");

		const availableEvents = await queryBuilder.getMany();

		return availableEvents.map((event) => ({
			type: "event",
			entity: event,
		}));
	}

	@Query(() => [EntityDetails])
	async searchInCustomerByTrainerID(
		@Arg("query") query: string,
		@Arg("trainerId") trainerId: number,
		@Arg("searchField", { nullable: true }) searchField?: string,
	): Promise<EntityDetails[]> {
		const trainerExists = await dataSource
			.getRepository(Trainer)
			.findOne({ where: { id: trainerId } });

		if (!trainerExists) {
			return [];
		}

		const trainerEvents = await dataSource.getRepository(Event).find({
			where: { trainer: { id: trainerId } },
			select: ["id"],
		});

		if (trainerEvents.length === 0) {
			return [];
		}

		const eventIds = trainerEvents.map((event) => event.id);

		const participations = await dataSource.getRepository(Participation).find({
			where: { event: { id: In(eventIds) } },
			relations: ["dog"],
		});

		if (participations.length === 0) {
			return [];
		}

		const dogIds = [
			...new Set(
				participations.map((p) => p.dog?.id).filter((id) => id !== undefined),
			),
		];

		if (!query.trim()) {
			const owners = await dataSource
				.getRepository(Owner)
				.createQueryBuilder("owner")
				.innerJoin("owner.dogs", "dog")
				.where("dog.id IN (:...dogIds)", { dogIds })
				.leftJoinAndSelect("owner.dogs", "allDogs")
				.distinct(true)
				.getMany();

			return owners.map((owner) => ({
				type: "owner",
				entity: owner,
			}));
		}

		if (searchField === "dog") {
			const dogSearchResults = await search(query);
			const matchingDogs = dogSearchResults.filter(
				(result) => result.entity_type === "dog",
			);

			if (matchingDogs.length === 0) {
				return [];
			}

			const searchedDogIds = matchingDogs.map((result) => result.entity_id);

			const owners = await dataSource
				.getRepository(Owner)
				.createQueryBuilder("owner")
				.innerJoin("owner.dogs", "dog")
				.where("dog.id IN (:...searchedDogIds)", { searchedDogIds })
				.andWhere("dog.id IN (:...dogIds)", { dogIds })
				.leftJoinAndSelect("owner.dogs", "allDogs")
				.distinct(true)
				.getMany();

			return owners.map((owner) => ({
				type: "owner",
				entity: owner,
			}));
		}

		const searchResults = await search(query);

		const ownerResults = searchResults.filter(
			(result) => result.entity_type === "owner",
		);

		if (ownerResults.length === 0) {
			return [];
		}

		const searchedOwnerIds = ownerResults.map((result) => result.entity_id);

		let queryBuilder = dataSource
			.getRepository(Owner)
			.createQueryBuilder("owner")
			.innerJoin("owner.dogs", "dog")
			.where("owner.id IN (:...searchedOwnerIds)", { searchedOwnerIds })
			.andWhere("dog.id IN (:...dogIds)", { dogIds });

		if (searchField === "lastname") {
			queryBuilder = queryBuilder.andWhere(
				"LOWER(owner.lastname) LIKE LOWER(:searchTerm)",
				{ searchTerm: `%${query.toLowerCase()}%` },
			);
		} else if (searchField === "firstname") {
			queryBuilder = queryBuilder.andWhere(
				"LOWER(owner.firstname) LIKE LOWER(:searchTerm)",
				{ searchTerm: `%${query.toLowerCase()}%` },
			);
		} else if (searchField === "email") {
			queryBuilder = queryBuilder.andWhere(
				"LOWER(owner.email) LIKE LOWER(:searchTerm)",
				{ searchTerm: `%${query.toLowerCase()}%` },
			);
		}

		queryBuilder = queryBuilder
			.leftJoinAndSelect("owner.dogs", "allDogs")
			.distinct(true);

		const customers = await queryBuilder.getMany();

		return customers.map((customer) => ({
			type: "owner",
			entity: customer,
		}));
	}
}

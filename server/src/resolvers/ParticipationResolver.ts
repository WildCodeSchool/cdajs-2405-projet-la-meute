import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Dog } from "../entities/Dog";
import { Event } from "../entities/Event";
import { Participation } from "../entities/Participation";

const dogRepository = dataSource.getRepository(Dog);
const eventRepository = dataSource.getRepository(Event);
const participationRepository = dataSource.getRepository(Participation);

@Resolver()
export class ParticipationResolver {
	@Query(() => Participation)
	async getParticipationById(
		@Arg("participationId") participationId: number,
	): Promise<Participation | null> {
		const participation = await participationRepository.findOne({
			where: { id: participationId },
			relations: ["event", "dog"],
		});
		return participation;
	}

	@Query(() => [Participation])
	async getParticipationByDogId(
		@Arg("dogId") dogId: number,
	): Promise<Participation[] | []> {
		const dog = await dogRepository.findOne({
			where: { id: dogId },
		});

		if (!dog) {
			throw new Error(`Dog with ID ${dogId} not found`);
		}

		const participation = await participationRepository.find({
			where: { dog: dog },
			relations: ["event", "dog"],
		});

		if (!participation) {
			throw new Error(`participation of ${dog.name} not found`);
		}

		return participation || [];
	}

	@Mutation(() => Participation)
	async createParticipation(
		@Arg("dogId") dogId: number,
		@Arg("eventId") eventId: number,
	): Promise<Participation> {
		const dog = await dogRepository.findOneBy({ id: dogId });
		if (!dog) {
			throw new Error(`Dog with ID ${dogId} not found`);
		}

		const event = await eventRepository.findOneBy({ id: eventId });
		if (!event) {
			throw new Error(`Event with ID ${eventId} not found`);
		}

		const existingParticipation = await participationRepository.findOne({
			where: {
				dog: { id: dogId },
				event: { id: eventId },
			},
			relations: ["dog", "event"],
		});

		if (existingParticipation) {
			throw new Error(
				`Participation already exists for dog ID ${dogId} and event ID ${eventId}`,
			);
		}

		const participation = new Participation(event, dog);
		return await participationRepository.save(participation);
	}

	@Mutation(() => Boolean)
	async deleteParticipationById(
		@Arg("participationId") participationId: number,
	): Promise<boolean> {
		const participation = await participationRepository.findOne({
			where: {
				id: participationId,
			},
		});

		if (!participation) {
			throw new Error(`participation with ID ${participationId} not found`);
		}

		const result = await participationRepository.delete(participationId);
		return result.affected ? result.affected > 0 : false;
	}

	@Mutation(() => Boolean)
	async deleteParticipationByEventAndDogId(
		@Arg("dogId") dogId: number,
		@Arg("eventId") eventId: number,
	): Promise<boolean> {
		const dog = await dogRepository.findOneBy({ id: dogId });
		if (!dog) {
			throw new Error(`Dog with ID ${dogId} not found`);
		}

		const event = await eventRepository.findOneBy({ id: eventId });
		if (!event) {
			throw new Error(`Event with ID ${eventId} not found`);
		}

		const participation = await participationRepository.findOne({
			where: {
				dog: { id: dogId },
				event: { id: eventId },
			},
			relations: ["dog", "event"],
		});

		if (!participation) {
			throw new Error(
				`participation with ID ${dogId} and ${eventId} not found`,
			);
		}

		const result = await participationRepository.delete(participation);
		return result.affected ? result.affected > 0 : false;
	}
}

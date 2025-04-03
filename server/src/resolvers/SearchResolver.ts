import { Resolver, Query, Arg } from "type-graphql";
import { search } from "../services/search";
import { SearchIndex } from "../entities/SearchIndex";
import { Event } from "../entities/Event"; // Ajoute d'autres entités si besoin
import { Dog } from "../entities/Dog";
import { dataSource } from "../dataSource/dataSource";
import { EntityDetails } from "../types/entityDetailsTypes";

const entityMap = {
	event: Event,
	dog: Dog,
} as const;

type EntityType = keyof typeof entityMap;

@Resolver()
export class SearchResolver {
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
			data: entity as Event | Dog,
		};
	}
}

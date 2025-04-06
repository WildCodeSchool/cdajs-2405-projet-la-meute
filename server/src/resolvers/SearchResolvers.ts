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
}

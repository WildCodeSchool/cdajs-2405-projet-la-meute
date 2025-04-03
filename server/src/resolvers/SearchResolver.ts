import { Resolver, Query, Arg } from "type-graphql";
import { search } from "../services/search";
import { SearchIndex } from "../entities/SearchIndex";

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
}

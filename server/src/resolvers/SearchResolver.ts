import { Resolver, Query, Arg } from "type-graphql";
import { search } from "../services/search";
import { SearchIndex } from "../entities/SearchIndex";

@Resolver()
export class SearchResolver {
	@Query(() => [SearchIndex])
	async search(@Arg("query") query: string): Promise<Partial<SearchIndex>[]> {
		const results = await search(query);

		return results.map(({ id, entity_type, entity_id }) => ({
			id,
			entity_type,
			entity_id,
		}));
	}
}

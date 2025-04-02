import { Resolver, Query, Arg } from "type-graphql";
import { search } from "../services/search";
import { SearchIndex } from "../entities/SearchIndex";

@Resolver()
export class SearchResolver {
	@Query(() => [SearchIndex])
	async search(@Arg("query") query: string): Promise<SearchIndex[]> {
		return await search(query);
	}
}

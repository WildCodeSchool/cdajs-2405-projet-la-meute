import { dataSource } from "../dataSource/dataSource";
import { SearchIndex } from "../entities/SearchIndex";

export const search = async (query: string) => {
	const formattedQuery = query
		.trim()
		.split(/\s+/)
		.map((term) => `${term}:*`)
		.join(" & ");

	const searchRepo = dataSource.getRepository(SearchIndex);

	return await searchRepo
		.createQueryBuilder("search")
		.where("search.document @@ to_tsquery('french', :query)", {
			query: formattedQuery,
		})
		.getMany();
};

import { dataSource } from "../dataSource/dataSource";
import { SearchIndex } from "../entities/SearchIndex";

export interface SearchOptions {
	entityTypes?: string[];
	limit?: number;
	offset?: number;
	sortBy?: string;
	sortDirection?: "ASC" | "DESC";
	additionalFilters?: Record<string, unknown>;
}

export const search = async (query: string, options: SearchOptions = {}) => {
	const {
		entityTypes,
		limit = 20,
		offset = 0,
		sortBy = "relevance",
		sortDirection = "DESC",
		additionalFilters = {},
	} = options;

	const formattedQuery = query
		.trim()
		.split(/\s+/)
		.map((term) => `${term}:*`)
		.join(" & ");

	const searchRepo = dataSource.getRepository(SearchIndex);

	let queryBuilder = searchRepo
		.createQueryBuilder("search")
		.where("search.document @@ to_tsquery('french', :query)", {
			query: formattedQuery,
		});

	if (entityTypes?.length) {
		queryBuilder = queryBuilder.andWhere(
			"search.entity_type IN (:...entityTypes)",
			{
				entityTypes,
			},
		);
	}

	for (const [key, value] of Object.entries(additionalFilters)) {
		queryBuilder = queryBuilder.andWhere(`search.${key} = :${key}`, {
			[key]: value,
		});
	}

	if (sortBy === "relevance") {
		queryBuilder = queryBuilder.orderBy(
			"ts_rank(search.document, to_tsquery('french', :query))",
			sortDirection,
		);
	} else {
		queryBuilder = queryBuilder.orderBy(`search.${sortBy}`, sortDirection);
	}

	queryBuilder = queryBuilder.take(limit).skip(offset);

	return await queryBuilder.getMany();
};

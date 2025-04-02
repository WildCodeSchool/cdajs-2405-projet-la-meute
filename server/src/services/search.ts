import { dataSource } from "../dataSource/dataSource";
import { SearchIndex } from "../entities/SearchIndex";

export const search = async (query: string) => {
	const searchRepo = dataSource.getRepository(SearchIndex);

	return await searchRepo
		.createQueryBuilder("search")
		.where("search.document @@ to_tsquery(:query)", { query })
		.getMany();
};

import "./CustomerList.scss";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_QUERY } from "@/graphQL/queries/search";
import type { SearchIndex } from "@/types/Search";

import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";
import Search from "@/components/_molecules/Search/Search";
import SearchResultItem from "@/components/_atoms/SearchResultItem/SearchResultItem";
import FilterItem from "@/components/_atoms/FilterItem/FilterItem";

function CustomerList() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filters, setFilters] = useState<string[]>([]);
	const filterOptions = ["Éducateur", "Lieu", "Evènement", "Date", "Chien"];

	const { data, loading, error } = useQuery(SEARCH_QUERY, {
		variables: { query: searchTerm },
		skip: !searchTerm,
	});

	return (
		<>
			<PlanningHeader title="Clients" />
			<Search
				setSearchTerm={setSearchTerm}
				setFilters={setFilters}
				filterOptions={filterOptions}
			/>
			<ul className="filterItemsList">
				{filters.map((filter) => (
					<FilterItem key={filter} filter={filter} setFilters={setFilters} />
				))}
			</ul>

			{loading && <p>Chargement...</p>}
			{error && <p>Erreur : {error.message}</p>}
			{data?.search?.length === 0 && !loading && <p>Aucun résultat trouvé.</p>}

			<div>
				{data?.search.map(({ id, entity_type, entity_id }: SearchIndex) => (
					<SearchResultItem key={id} type={entity_type} id={entity_id} />
				))}
			</div>
		</>
	);
}

export default CustomerList;

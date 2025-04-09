import "./CustomerList.scss";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_QUERY } from "@/graphQL/queries/search";
import type { SearchIndex } from "@/types/Search";

import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";
import Search from "@/components/_molecules/Search/Search";
import SearchResultItem from "@/components/_atoms/SearchResultItem/SearchResultItem";

function CustomerList() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filter, setFilter] = useState("");
	const filterOptions = ["Éducateur", "Lieu", "Evènement", "Date", "Chien"];

	const { data, loading, error } = useQuery(SEARCH_QUERY, {
		variables: { query: searchTerm },
		skip: !searchTerm,
	});

	// biome-ignore lint/suspicious/noConsoleLog: FIXME: delete when filters are used
	console.log("applied filter waiting to be implemented", filter);

	return (
		<>
			<PlanningHeader title="Clients" />
			<Search
				setSearchTerm={setSearchTerm}
				setFilter={setFilter}
				filterOptions={filterOptions}
			/>

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

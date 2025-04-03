import { useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_QUERY } from "@/graphQL/queries/search";
import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";
import SearchBar from "@/components/_atoms/SearchBar/SearchBar";
import "./CustomerList.scss";
import type { SearchIndex } from "@/types/Search";
import SearchResultItem from "@/components/_atoms/SearchResultItem/SearchResultItem";

function CustomerList() {
	const [searchTerm, setSearchTerm] = useState("");

	const { data, loading, error } = useQuery(SEARCH_QUERY, {
		variables: { query: searchTerm },
		skip: !searchTerm, // Évite d'exécuter la requête si le champ est vide
	});

	return (
		<>
			<PlanningHeader title="Clients" />
			<SearchBar onSearch={setSearchTerm} />

			{loading && <p>Chargement...</p>}
			{error && <p>Erreur : {error.message}</p>}
			{data?.search?.length === 0 && !loading && <p>Aucun résultat trouvé.</p>}

			<ul>
				{data?.search.map(({ id, entity_type, entity_id }: SearchIndex) => (
					<>
						<p key={id}>
							{entity_type} & {entity_id}
						</p>
						<SearchResultItem key={id} type={entity_type} id={entity_id} />
					</>
				))}
			</ul>
		</>
	);
}

export default CustomerList;

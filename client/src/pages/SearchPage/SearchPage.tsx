import "./SearchPage.scss";

import { useState } from "react";
import { useQuery } from "@apollo/client";

import {
	SEARCH_AVAILABLE_EVENTS,
	SEARCH_IN_CUSTOMER_BY_TRAINER_ID,
} from "@/graphQL/queries/search";
import type { SearchableEntity, SearchIndex } from "@/types/Search";
import { useUser } from "@/hooks/useUser";

import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";
import Search from "@/components/_molecules/Search/Search";
import SearchResultItem from "@/components/_atoms/SearchResultItem/SearchResultItem";
import LoadingIndicator from "@/components/_atoms/LoadingIndicator/LoadingIndicator";

const mappedArray = [
	{
		role: "trainer",
		filterOptions: ["dog", "lastname", "firstname", "email"],
		title: "Clients",
		frontendQuery: SEARCH_IN_CUSTOMER_BY_TRAINER_ID,
		backendQuery: "searchInCustomerByTrainerID",
	},
	{
		role: "owner",
		filterOptions: ["event"],
		title: "Évènements",
		frontendQuery: SEARCH_AVAILABLE_EVENTS,
		backendQuery: "searchAvailableEvents",
	},
];

function SearchPage() {
	const { user } = useUser();
	const isTrainer = user?.role === "trainer";

	const switchData = isTrainer ? mappedArray[0] : mappedArray[1];
	const filterOptions = switchData.filterOptions;

	const [searchTerm, setSearchTerm] = useState("");
	const [filter, setFilter] = useState("");

	const { data, loading, error } = useQuery(switchData.frontendQuery, {
		variables: {
			query: searchTerm,
			searchField: filter,
			...(isTrainer && { trainerId: Number(user?.id) }),
		},
		skip: isTrainer && !searchTerm,
		fetchPolicy: "no-cache",
	});

	return (
		<>
			<PlanningHeader
				title={switchData.title}
				buttonLabel="invite"
				href="mailto:contact@pawplanner.com"
			/>
			<Search
				setSearchTerm={setSearchTerm}
				setFilter={setFilter}
				filterOptions={filterOptions}
			/>

			{loading && <LoadingIndicator />}
			{error && <p>Erreur : {error.message}</p>}
			{data?.[switchData.backendQuery]?.length === 0 && !loading && (
				<p>Aucun résultat trouvé.</p>
			)}

			<div>
				{data?.[switchData.backendQuery].map(({ entity }: SearchIndex) => (
					<SearchResultItem
						key={entity.id}
						entity={entity as SearchableEntity}
					/>
				))}
			</div>
		</>
	);
}

export default SearchPage;

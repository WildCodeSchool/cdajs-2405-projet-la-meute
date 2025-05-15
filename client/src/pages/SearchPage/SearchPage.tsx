import LoadingIndicator from "@/components/_atoms/LoadingIndicator/LoadingIndicator";
import SearchResultItem from "@/components/_atoms/SearchResultItem/SearchResultItem";
import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";
import Search from "@/components/_molecules/Search/Search";
import {
	SEARCH_AVAILABLE_EVENTS,
	SEARCH_IN_CUSTOMER_BY_TRAINER_ID,
} from "@/graphQL/queries/search";
import { useUser } from "@/hooks/useUser";
import type { SearchableEntity, SearchIndex } from "@/types/Search";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import "./SearchPage.scss";

export interface filterOption {
	value: string;
	label: string;
}

const mappedArray = [
	{
		role: "trainer",
		filterOptions: [
			{
				value: "dog",
				label: "Chien",
			},
			{
				value: "lastname",
				label: "Nom",
			},
			{
				value: "firstname",
				label: "Prénom",
			},
			{
				value: "email",
				label: "Email",
			},
		],
		title: "Clients",
		frontendQuery: SEARCH_IN_CUSTOMER_BY_TRAINER_ID,
		backendQuery: "searchInCustomerByTrainerID",
	},
	{
		role: "owner",
		filterOptions: [
			{
				value: "event",
				label: "Évènements",
			},
		],
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

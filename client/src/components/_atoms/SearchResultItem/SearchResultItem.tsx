import { ENTITY_DETAILS_QUERY } from "@/graphQL/queries/search";
import { useQuery } from "@apollo/client";

function SearchResultItem({ type, id }: { type: string; id: number }) {
	const { data, loading, error } = useQuery(ENTITY_DETAILS_QUERY, {
		variables: { id, entityType: type },
	});

	if (loading) return <p>Chargement...</p>;
	if (error) return <p>Erreur : {error.message}</p>;

	return (
		<li>
			<h3>{data?.event?.name || `ID ${id}`}</h3>
			<p>{data?.event?.description}</p>
		</li>
	);
}

export default SearchResultItem;

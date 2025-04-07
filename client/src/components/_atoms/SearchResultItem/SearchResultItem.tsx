import { ENTITY_DETAILS_QUERY } from "@/graphQL/queries/search";
import { useQuery } from "@apollo/client";

import "./SearchResultItem.scss";

function SearchResultItem({ type, id }: { type: string; id: number }) {
	const { data, loading, error } = useQuery(ENTITY_DETAILS_QUERY, {
		variables: { entityType: type, getEntityDetailsId: id },
	});

	if (loading) return <p>Chargement...</p>;
	if (error) return <p>Erreur : {error.message}</p>;

	const entity = data?.GetEntityDetails?.entity;
	const entityType = data?.GetEntityDetails?.type;

	return (
		<article className="searchResultItem">
			<h2>{entityType}</h2>
			<pre>{JSON.stringify(entity, null, 2)}</pre>
		</article>
	);
}

export default SearchResultItem;

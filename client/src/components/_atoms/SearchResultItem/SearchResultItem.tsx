import "./SearchResultItem.scss";

function SearchResultItem({ type, entity }: { type: string; entity: any }) {
	console.log("entity type", type);

	return (
		<article className="searchResultItem">
			<h2>{type}</h2>
			<pre>{JSON.stringify(entity, null, 2)}</pre>
		</article>
	);
}

export default SearchResultItem;

import { Search } from "@/assets/icons/search";
import "./SearchBar.scss";

const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
	event.preventDefault();
	const query = event.currentTarget.q.value;
	// biome-ignore lint/suspicious/noConsoleLog: console.log
	console.log("Recherche pour :", query);
};

function SearchBar() {
	return (
		<form
			aria-label="Rechercher sur le site"
			className="searchbar"
			onSubmit={handleSearch}
		>
			<label htmlFor="search-input" className="searchbar__label">
				Rechercher
			</label>
			<button
				type="submit"
				aria-label="Valider la recherche"
				className="searchbar__button"
			>
				<Search aria-hidden="true" className="searchbar__button--icon" />
			</button>
			<input
				type="search"
				id="search-input"
				name="q"
				placeholder="Rechercher..."
				aria-label="Rechercher un contenu"
				required
				className="searchbar__input"
			/>
		</form>
	);
}

export default SearchBar;

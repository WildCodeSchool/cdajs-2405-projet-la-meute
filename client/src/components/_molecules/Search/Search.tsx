import SearchBar from "@/components/_atoms/SearchBar/SearchBar";
import SearchFilters from "@/components/_atoms/SearchFilters/SearchFilters";

import "./Search.scss";

interface SearchProps {
	setSearchTerm: (query: string) => void;
	setFilter: React.Dispatch<React.SetStateAction<string>>;
	filterOptions: string[];
}

function Search({ setSearchTerm, setFilter, filterOptions }: SearchProps) {
	return (
		<section className="search">
			<SearchBar onSearch={setSearchTerm} />
			<SearchFilters setFilter={setFilter} filterOptions={filterOptions} />
		</section>
	);
}

export default Search;

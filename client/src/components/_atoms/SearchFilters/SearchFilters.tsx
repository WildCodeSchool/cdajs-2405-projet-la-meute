import { useState } from "react";
import "./SearchFilters.scss";

interface SearchFiltersProps {
	setFilters: React.Dispatch<React.SetStateAction<string[]>>;
	filterOptions: string[];
}

function SearchFilters({ setFilters, filterOptions }: SearchFiltersProps) {
	const [selectedFilter, setSelectedFilter] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newFilter = e.target.value;
		setSelectedFilter(newFilter);
		setFilters((prev: string[]) =>
			prev.includes(newFilter) ? prev : [...prev, newFilter],
		);
		setSelectedFilter("");
	};

	return (
		<>
			<select
				className="searchFilters"
				value={selectedFilter}
				onChange={handleChange}
			>
				<option className="searchFilters__option" value="">
					Filtrer par type de liste
				</option>
				{filterOptions.map((filter) => (
					<option className="searchFilters__option" key={filter} value={filter}>
						{filter}
					</option>
				))}
			</select>
		</>
	);
}

export default SearchFilters;

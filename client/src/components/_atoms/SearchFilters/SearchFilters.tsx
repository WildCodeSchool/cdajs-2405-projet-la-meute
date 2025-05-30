import type { filterOption } from "@/pages/SearchPage/SearchPage";
import { useState } from "react";
import "./SearchFilters.scss";

interface SearchFiltersProps {
	setFilter: React.Dispatch<React.SetStateAction<string>>;
	filterOptions: filterOption[];
}

function SearchFilters({ setFilter, filterOptions }: SearchFiltersProps) {
	const [selectedFilter, setSelectedFilter] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newFilter = e.target.value;
		setSelectedFilter(newFilter);
		setFilter(newFilter);
	};

	return (
		<>
			<select
				className="searchFilters"
				value={selectedFilter}
				onChange={handleChange}
			>
				<option className="searchFilters__option" value="">
					Filtrer par ...
				</option>
				<option value="">Aucun filtre appliqué</option>
				{filterOptions.map((filter) => (
					<option
						className="searchFilters__option"
						key={filter.value}
						value={filter.value}
					>
						{filter.label}
					</option>
				))}
			</select>
		</>
	);
}

export default SearchFilters;

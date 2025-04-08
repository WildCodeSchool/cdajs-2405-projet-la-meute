import "./FilterItem.scss";

interface FilterItemProps {
	filter: string;
	setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

function FilterItem({ filter, setFilters }: FilterItemProps) {
	const handleClick = () => {
		setFilters((prev) => prev.filter((f) => f !== filter));
	};
	return (
		<>
			<p onClick={handleClick} onKeyUp={handleClick} className="filterItem">
				{filter}&nbsp;&nbsp;<span className="filterItem__close">x</span>
			</p>
		</>
	);
}

export default FilterItem;

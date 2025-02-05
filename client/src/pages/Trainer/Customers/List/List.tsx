import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";
import "./List.scss";
import SearchBar from "@/components/_atoms/SearchBar/SearchBar";

function List() {
	return (
		<>
			<PlanningHeader title="Clients" />
			<SearchBar />
		</>
	);
}

export default List;

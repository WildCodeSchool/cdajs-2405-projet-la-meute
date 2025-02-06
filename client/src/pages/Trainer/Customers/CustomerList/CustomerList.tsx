import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";
import "./CustomerList.scss";
import SearchBar from "@/components/_atoms/SearchBar/SearchBar";

function CustomerList() {
	return (
		<>
			<PlanningHeader title="Clients" />
			<SearchBar />
		</>
	);
}

export default CustomerList;

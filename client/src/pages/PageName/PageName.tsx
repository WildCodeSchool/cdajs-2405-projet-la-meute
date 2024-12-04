import ComponentName from "@/components/ComponentName/ComponentName";
import "./PageName.scss";
import { GET_EXAMPLE_BY_ID } from "@/graphQL/queries/example";
import { useQuery } from "@apollo/client";

function PageName() {

	const { data, loading, error } = useQuery(GET_EXAMPLE_BY_ID, {
		variables: {
			getExampleByIdId: 1,
		},
	});

	if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

	return (
		<main className="debug">
			<h1 className="pageName__element--modifier">Page Name</h1>
			<a href="/" className="debug">
				Test fetch should show an example : {data?.getExampleById ? `🐾 ${data.getExampleById.title} 🐾` : "failed"}
			</a>
			<ComponentName />
		</main>
	);
}

export default PageName;

import { Link } from "react-router-dom";

function Homepage() {
	return (
		<>
			<h1>Homepage</h1>
			<Link to={"/page"}>Link to page</Link>
		</>
	);
}

export default Homepage;

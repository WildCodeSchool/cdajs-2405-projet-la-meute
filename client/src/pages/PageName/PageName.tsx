import ComponentName from "@/components/ComponentName/ComponentName";
import type { Example } from "@/types/Example";
import "./PageName.scss";

function PageName() {
	let item: Example;
	return (
		<main className="debug">
			<h1 className="pageName__element--modifier">Page Name</h1>
			<a href="/" className="debug">
				Test link
			</a>
			<ComponentName />
		</main>
	);
}

export default PageName;

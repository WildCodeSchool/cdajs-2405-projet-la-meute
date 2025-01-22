import "./PlanningHeader.scss";
import Button from "@/components/_atoms/Button/Button";

export default function PlanningHeader({
	title,
	button = true,
}: { title: string; button?: boolean }) {
	return (
		<>
			<header className="planningHeader">
				<h1 className="planningHeader__title">{title}</h1>
				{button && <Button type="invite" />}
			</header>
		</>
	);
}

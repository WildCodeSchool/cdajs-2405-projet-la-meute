import "./PlanningHeader.scss";
import Button from "@/components/_atoms/Button/Button";

export default function PlanningHeader({ title }: { title: string }) {
	return (
		<>
			<header className="planningHeader">
				<h1 className="planningHeader__title">{title}</h1>
				<Button type="invite" />
			</header>
		</>
	);
}

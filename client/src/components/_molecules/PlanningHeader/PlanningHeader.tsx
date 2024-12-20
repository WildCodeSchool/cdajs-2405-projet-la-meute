import H1 from "@/components/_atoms/H1/H1";
import "./PlanningHeader.scss";
import Button from "@/components/_atoms/Button/Button";

export default function PlanningHeader({ title }: { title: string }) {
	return (
		<>
			<header className="planningHeader">
				<H1 className="planningHeader__title">{title}</H1>
				<Button type="invite" href="" />
			</header>
		</>
	);
}

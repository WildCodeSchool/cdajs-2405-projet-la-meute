import "./PlanningHeader.scss";
import Button from "@/components/_atoms/Button/Button";

export default function PlanningHeader({
	title,
	button = true,
	buttonLabel = "invite",
	href = "",
}: {
	title: string;
	button?: boolean;
	buttonLabel?: "invite" | "event";
	href?: string;
}) {
	return (
		<>
			<header className="planningHeader">
				<h1 className="planningHeader__title">{title}</h1>
				{button && <Button style={buttonLabel} type="button" href={href} />}
			</header>
		</>
	);
}

import "./PlanningHeader.scss";
import Button from "@/components/_atoms/Button/Button";
import { useUser } from "@/hooks/useUser";

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
	const { role } = useUser();
	const isTrainer = role === "trainer";

	return (
		<>
			<header className="planningHeader">
				<h1 className="planningHeader__title">{title}</h1>
				{button && isTrainer && buttonLabel && href && (
					<Button style={buttonLabel} type="button" href={href} />
				)}
			</header>
		</>
	);
}

import "./ParticipantsOverview.scss";

import DogBubbles from "@/components/_atoms/DogsBubbles/DogsBubbles";
import TrainerBubble from "@/components/_atoms/TrainerBubble/TrainerBubble";
import { useLocation } from "react-router-dom";

import type { Dog } from "@/types/Dog";
import type { Event } from "@/types/Event";

type ParticipantsOverviewProps = {
	title: string;
	type: "trainer" | "dogs";
	event: Event;
	dogs?: Dog[];
	context?: "event" | "profile";
};

function ParticipantsOverview({
	title,
	type,
	event,
	dogs,
	context,
}: ParticipantsOverviewProps) {
	const location = useLocation();

	const isEventContext =
		context === "event" || location.pathname.includes("/event/");

	return (
		<>
			<h3 className="participantsOverview__participation--title">{title}</h3>
			<div className="participantsOverview__participation--wrapper">
				{type === "trainer" ? (
					<TrainerBubble trainer={event.trainer} />
				) : (
					type === "dogs" &&
					dogs && (
						<DogBubbles
							dogs={dogs.map((dog) => dog)}
							maxSize={event.group_max_size}
							context={isEventContext ? "event" : "profile"}
						/>
					)
				)}
			</div>

			<div className="participantsOverview__price--container">
				<div className="participantsOverview__price--divText">
					<p className="participantsOverview__price--title">Prix TTC</p>
					<p className="participantsOverview__price--parenthesis">
						(par participant)
					</p>
				</div>
				<p className="participantsOverview__price--number">{event.price} €</p>
			</div>
		</>
	);
}

export default ParticipantsOverview;

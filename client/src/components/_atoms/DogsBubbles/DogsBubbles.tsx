import { useImageUrl } from "@/hooks/useImageUrl";
import type { Dog } from "@/types/Dog";
import type React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./DogsBubbles.scss";

interface DogBubblesProps {
	dogs: Dog[];
	maxSize: number;
	context?: "event" | "profile";
}

const DogBubbles: React.FC<DogBubblesProps> = ({ dogs, maxSize, context }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id: eventId } = useParams();

	const isEventContext =
		context === "event" || location.pathname.includes("/event/");

	if (!dogs || dogs.length === 0) {
		return (
			<div className="participants-wrapper">
				<div className="participants-count">
					{`Aucun participant pour le moment / ${maxSize} places disponibles`}
				</div>
			</div>
		);
	}

	const handleDogClick = (dogId: number) => {
		if (isEventContext && eventId) {
			navigate(`/event/${eventId}/dog/${dogId}`);
		} else {
			navigate(`/profile/view/dog/${dogId}`);
		}
	};

	return (
		<div className="participants-wrapper">
			<div className="dog__bubbles">
				{dogs.map((dog, index) => (
					<div
						key={dog.id}
						className="dog__bubble"
						style={{ zIndex: dogs.length - index }}
						onClick={() => handleDogClick(Number(dog.id))}
						title={dog.name}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								handleDogClick(Number(dog.id));
								e.preventDefault();
							}
						}}
					>
						<img
							src={
								dog?.picture
									? useImageUrl(dog?.picture)
									: useImageUrl("/upload/images/defaultuserprofile.jpg")
							}
							alt={dog.name}
							className="dog__profile-pic"
						/>
					</div>
				))}
			</div>
			<div className="participants-count">
				{`${dogs.length} chien${dogs.length > 1 ? "s" : ""} / ${maxSize} places disponibles`}
			</div>
		</div>
	);
};

export default DogBubbles;

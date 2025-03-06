import React from "react";
import "./DogsBubbles.scss";

interface Dog {
	id: number;
	name: string;
	picture?: string;
	birthDate?: Date;
	getAge?: number;
	breed?: string;
	info?: string;
}

interface DogBubblesProps {
	dogs: Dog[];
	maxSize: number;
	onDogClick?: (dog: Dog) => void;
}

const DogBubbles: React.FC<DogBubblesProps> = ({
	dogs,
	maxSize,
	onDogClick,
}) => {
	if (!dogs || dogs.length === 0) {
		return (
			<div className="participants-wrapper">
				<div className="participants-count">
					{`0 participant pour le moment / ${maxSize} places disponibles`}
				</div>
			</div>
		);
	}

	const handleDogClick = (dog: Dog) => {
		if (onDogClick) {
			onDogClick(dog);
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
						onClick={() => handleDogClick(dog)}
						title={dog.name}
					>
						<img
							src={
								dog?.picture
									? `${import.meta.env.VITE_API_URL}${dog?.picture}`
									: `${import.meta.env.VITE_API_URL}/upload/images/defaultuserprofile.jpg`
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

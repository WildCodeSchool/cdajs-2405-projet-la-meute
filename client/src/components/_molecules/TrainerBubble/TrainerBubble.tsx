import React from "react";
import "./TrainerBubble.scss";
import { useImageUrl } from "@/hooks/useImageUrl";

interface Trainer {
	id: number;
	lastname: string;
	firstname: string;
	email?: string;
	phone_number?: string;
	postal_code: string;
	avatar: string;
}

interface TrainerBubbleProps {
	trainer: Trainer;
	onTrainerClick?: (trainer: Trainer) => void;
}

const TrainerBubble: React.FC<TrainerBubbleProps> = ({
	trainer,
	onTrainerClick,
}) => {
	const handleTrainerClick = (trainer: Trainer) => {
		if (onTrainerClick) {
			onTrainerClick(trainer);
		}
	};

	return (
		<div>
			<div className="trainer__bubbles">
				<div
					className="trainer__bubble"
					onClick={() => handleTrainerClick(trainer)}
					title={trainer.firstname}
				>
					<img
						src={
							trainer?.avatar
								? useImageUrl(trainer?.avatar)
								: useImageUrl("/upload/images/defaultuserprofile.jpg")
						}
						alt={trainer.firstname}
						className="trainer__profile-pic"
					/>
				</div>
			</div>
			<div className="trainer__infos">
				<p className="trainer__name">
					{trainer.firstname} {trainer.lastname}
				</p>
				<p className="trainer__email">{trainer.email}</p>
			</div>
		</div>
	);
};

export default TrainerBubble;

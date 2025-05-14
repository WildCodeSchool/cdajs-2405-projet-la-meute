import { safeEmail } from "@/helpers/safeEmail";
import { useImageUrl } from "@/hooks/useImageUrl";
import type React from "react";
import { useNavigate } from "react-router-dom";
import "./TrainerBubble.scss";

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
}

const TrainerBubble: React.FC<TrainerBubbleProps> = ({ trainer }) => {
	const navigate = useNavigate();

	const handleTrainerClick = (trainer: Trainer) => {
		navigate(`/profile/view/trainer/${Number(trainer.id)}`);
	};

	return (
		<div>
			<div className="trainer__bubbles">
				<div
					className="trainer__bubble"
					onClick={() => handleTrainerClick(trainer)}
					title={trainer.firstname}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							handleTrainerClick(trainer);
							e.preventDefault();
						}
					}}
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
				<p className="trainer__email">{safeEmail(trainer.email)}</p>
			</div>
		</div>
	);
};

export default TrainerBubble;

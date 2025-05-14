import { safeEmail } from "@/helpers/safeEmail";
import { useImageUrl } from "@/hooks/useImageUrl";
import type { Owner } from "@/types/User";
import type React from "react";
import { useNavigate } from "react-router-dom";
import "./OwnerBubble.scss";

interface OwnerBubbleProps {
	owner: Owner;
}

const OwnerBubble: React.FC<OwnerBubbleProps> = ({ owner }) => {
	const navigate = useNavigate();

	const handleOwnerClick = (owner: Owner) => {
		navigate(`/profile/view/owner/${Number(owner.id)}`);
	};

	return (
		<div>
			<div className="owner__bubbles">
				<div
					className="owner__bubble"
					onClick={() => handleOwnerClick(owner)}
					onKeyDown={() => handleOwnerClick(owner)}
					title={owner.firstname}
				>
					<img
						src={
							owner?.avatar
								? useImageUrl(owner?.avatar)
								: useImageUrl("/upload/images/defaultuserprofile.jpg")
						}
						alt={owner.firstname}
						className="owner__profile-pic"
					/>
				</div>
			</div>
			<div className="owner__infos">
				<p className="owner__name">
					{owner.firstname} {owner.lastname}
				</p>
				{owner.email && (
					<p className="owner__email">
						<a
							href={`mailto:${owner.email}`}
							title={`Envoyer un email à ${owner.firstname} ${owner.lastname}`}
						>
							{safeEmail(owner.email)}
						</a>
					</p>
				)}
			</div>
		</div>
	);
};

export default OwnerBubble;

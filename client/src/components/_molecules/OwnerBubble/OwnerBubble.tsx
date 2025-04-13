import type React from "react";
import "./OwnerBubble.scss";
import { useImageUrl } from "@/hooks/useImageUrl";
import type { Owner } from "@/types/User";

interface OwnerBubbleProps {
	owner: Owner;
	onOwnerClick?: (owner: Owner) => void;
}

const OwnerBubble: React.FC<OwnerBubbleProps> = ({ owner, onOwnerClick }) => {
	const handleOwnerClick = (owner: Owner) => {
		if (onOwnerClick) {
			onOwnerClick(owner);
		}
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
							{owner.email}
						</a>
					</p>
				)}
			</div>
		</div>
	);
};

export default OwnerBubble;

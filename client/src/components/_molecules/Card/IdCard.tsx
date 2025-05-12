import "./IdCard.scss";
import type { Dog } from "@/types/Dog";
import type { Owner } from "@/types/User";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { useImageUrl } from "@/hooks/useImageUrl";

type IdCardProps = {
	type: "dog" | "owner";
	data: Dog | Owner;
	ownerView?: boolean;
	trainerView?: boolean;
};

export default function IdCard({
	type,
	data,
	ownerView,
	trainerView,
}: IdCardProps) {
	const isDog = type === "dog";
	const dogData = data as Dog;
	const ownerData = data as Owner;
	const { role } = useUser();

	const getCardInfo = () => {
		if (isDog) {
			const dogImage = dogData.picture || "/upload/images/defaultdog.jpg";
			return {
				image: useImageUrl(dogImage),
				imageAlt: `${dogData.name} le chien`,
				title: dogData.name,
				subtitle: dogData.breed,
				age: dogData.getAge,
				info: dogData.info,
				link:
					role === "owner"
						? `/owner/my-dogs/profile/${dogData.id}`
						: role === "trainer" && trainerView
							? `/profile/view/dog/${dogData.id}`
							: `/dog/${dogData.id}`,
				buttonText: ownerView
					? "Modifier le profil"
					: trainerView
						? "Voir les détails"
						: "Voir le profil",
			};
		}

		return {
			image: useImageUrl(ownerData.avatar),
			imageAlt: `Avatar de ${ownerData.firstname} ${ownerData.lastname}`,
			title: `${ownerData.firstname} ${ownerData.lastname}`,
			subtitle: ownerData.email,
			info: ownerData.phone_number,
			link: `/customer/${ownerData.id}`,
			buttonText: "Voir le profil",
		};
	};

	const { image, imageAlt, title, subtitle, info, link, age, buttonText } =
		getCardInfo();

	return (
		<article className="idCard" {...(isDog ? { "data-dog": true } : {})}>
			<img
				src={image}
				alt={imageAlt}
				className={`idCard__image${!isDog ? "--round" : ""}`}
			/>
			<div className="idCard__infos">
				<span className="idCard__infos--title">
					<h3>{title}</h3>
					{age && <p>{age}</p>}
				</span>
				<p className="idCard__infos--sub">{subtitle}</p>
				<hr className="idCard__infos--hr" />
				<p className="idCard__infos--infos">{info}</p>
			</div>
			<Link to={link} className="idCard--link">
				{buttonText} &gt;
			</Link>
		</article>
	);
}

import "./IdCard.scss";
import type { Dog } from "@/types/Dog";
import type { Owner } from "@/types/User";

type IdCardProps = {
	type: "dog" | "owner";
	data: Dog | Owner;
};

export default function IdCard({ type, data }: IdCardProps) {
	const isDog = type === "dog";
	const dogData = data as Dog;
	const ownerData = data as Owner;

	const getCardInfo = () => {
		if (isDog) {
			return {
				image: dogData.picture,
				imageAlt: `${dogData.name} le chien`,
				title: dogData.name,
				subtitle: dogData.breed,
				age: `${dogData.getAge} ans`,
				info: "informations complémentaires",
				link: `/dog/${dogData.id}`,
			};
		}

		return {
			image: ownerData.avatar,
			imageAlt: `Avatar de ${ownerData.firstname} ${ownerData.lastname}`,
			title: `${ownerData.firstname} ${ownerData.lastname}`,
			subtitle: ownerData.email,
			info: ownerData.phone_number,
			link: `/customer/${ownerData.id}`,
		};
	};

	const { image, imageAlt, title, subtitle, info, link, age } = getCardInfo();

	return (
		<article className="idCard" {...(isDog ? { "data-dog": true } : {})}>
			<img
				src={image}
				alt={imageAlt}
				className={`idCard__image${!isDog && "--round"}`}
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
			<a href={link} className="idCard--link">
				Voir le profil &gt;
			</a>
		</article>
	);
}

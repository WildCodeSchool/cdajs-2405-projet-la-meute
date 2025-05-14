import Button from "@/components/_atoms/Button/Button";
import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";
import {
	GET_ALL_DOGS_BY_OWNER_ID,
	GET_OWNER_BY_ID,
} from "@/graphQL/queries/owner";
import { useImageUrl } from "@/hooks/useImageUrl";
import type { Dog } from "@/types/Dog";
import type { Owner } from "@/types/User";
import { useQuery } from "@apollo/client";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./OwnerId.scss";
import LoadingIndicator from "@/components/_atoms/LoadingIndicator/LoadingIndicator";

interface OwnerIdProps {
	source?: "event" | "profile";
	backButtonText?: string;
	className?: string;
}

function OwnerId({
	source: explicitSource,
	backButtonText: explicitButtonText,
	className = "",
}: OwnerIdProps) {
	const { id, eventId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	const isEventContext =
		location.pathname.includes("/event/") || explicitSource === "event";

	const buttonText =
		explicitButtonText || (isEventContext ? "Retour à l'évènement" : "Retour");

	const {
		loading: ownerLoading,
		error: ownerError,
		data: ownerData,
	} = useQuery(GET_OWNER_BY_ID, {
		variables: { id: Number.parseFloat(id || "0") },
		skip: !id,
		fetchPolicy: "network-only",
	});

	const {
		loading: dogsLoading,
		error: dogsError,
		data: dogsData,
	} = useQuery(GET_ALL_DOGS_BY_OWNER_ID, {
		variables: { ownerId: Number.parseFloat(id || "0") },
		skip: !id,
		fetchPolicy: "network-only",
	});

	const owner: Owner | null = ownerData?.getOwnerById || null;
	const dogs: Dog[] | null = dogsData?.getAllDogsByOwnerId || null;

	const loading = ownerLoading || dogsLoading;
	const error = ownerError || dogsError;

	const handleGoBack = () => {
		if (isEventContext && eventId) {
			navigate(`/event/${eventId}`);
		} else {
			navigate(-1);
		}
	};

	const getDogLink = (dogId: number | undefined) => {
		if (!dogId) return "";

		if (isEventContext && eventId) {
			return `/event/${eventId}/dog/${dogId}`;
		}
		return `/profile/view/dog/${dogId}`;
	};

	const mainClassName = `ownerProfile ${isEventContext ? "ownerProfile--event" : "ownerProfile--profile"} ${className}`;

	return (
		<>
			<PlanningHeader
				title={
					owner
						? `Profil de ${owner.firstname} ${owner.lastname}`
						: "Profil du client"
				}
				buttonLabel="invite"
				href="mailto:contact@pawplanner.com"
			/>
			{loading ? (
				<LoadingIndicator />
			) : error ? (
				<div>
					<p>Une erreur est survenue lors du chargement des données.</p>
					<Button
						style={{ type: "thin-btn-light", color: "blue" }}
						onClick={handleGoBack}
					>
						Retour
					</Button>
				</div>
			) : owner ? (
				<main className={mainClassName}>
					<div className="ownerProfile__form">
						<div className="ownerProfile__form--title">
							<img
								src={
									owner.avatar
										? useImageUrl(owner.avatar)
										: useImageUrl("/upload/images/defaultuserprofile.jpg")
								}
								alt={`${owner.firstname} ${owner.lastname}`}
							/>
							<h2>
								{owner.firstname} {owner.lastname}
							</h2>
						</div>
						<div className="ownerProfile__form--info">
							<div className="ownerProfile__form--detail">
								<h3>Email</h3>
								<a
									href={`mailto:${owner.email}`}
									title={`Envoyer un email à ${owner.firstname} ${owner.lastname}`}
								>
									{owner.email}
								</a>
							</div>
							<div className="ownerProfile__form--detail">
								<h3>Téléphone</h3>
								{owner.phone_number ? (
									<a
										href={`tel:${owner.phone_number}`}
										title={`Appeler ${owner.firstname} ${owner.lastname}`}
									>
										{owner.phone_number}
									</a>
								) : (
									<p>Non renseigné</p>
								)}
							</div>
							<div className="ownerProfile__form--detail">
								<h3>Ville</h3>
								<p>{owner.city}</p>
							</div>
							<div className="ownerProfile__form--detail">
								<h3>Code Postal</h3>
								<p>{owner.postal_code}</p>
							</div>
						</div>
					</div>

					<div className="ownerProfile__nav">
						{/* Dogs display */}
						{dogs && dogs.length > 0 && (
							<div className="ownerProfile__dogs">
								<h1>Chiens</h1>
								<div className="ownerProfile__dogs--list">
									{dogs.map((dog) => (
										<Link
											key={dog.id}
											to={getDogLink(dog.id)}
											className="ownerProfile__dogs--item"
											aria-label={`Voir le profil de ${dog.name}`}
										>
											<img
												src={
													dog.picture
														? useImageUrl(dog.picture)
														: useImageUrl("/upload/images/defaultdog.jpg")
												}
												alt={dog.name}
											/>
											<p>{dog.name}</p>
										</Link>
									))}
								</div>
							</div>
						)}

						<div
							className={
								isEventContext
									? "ownerProfile__nav--button"
									: "ownerProfile__return--button"
							}
						>
							<Button
								style={{ type: "thin-btn-light", color: "blue" }}
								onClick={handleGoBack}
							>
								{buttonText}
							</Button>
						</div>
					</div>
				</main>
			) : (
				<p>Profil client non trouvé</p>
			)}
		</>
	);
}

export default OwnerId;

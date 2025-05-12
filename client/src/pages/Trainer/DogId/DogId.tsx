import Button from "@/components/_atoms/Button/Button";
import OwnerBubble from "@/components/_atoms/OwnerBubble/OwnerBubble";
import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";
import { GET_DOG_BY_ID, GET_OWNER_BY_DOG_ID } from "@/graphQL/queries/dog";
import { useImageUrl } from "@/hooks/useImageUrl";
import type { Dog } from "@/types/Dog";
import type { Owner } from "@/types/User";
import { useQuery } from "@apollo/client";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./DogId.scss";

interface DogIdProps {
	source?: "event" | "profile";
	backButtonText?: string;
	className?: string;
}

function DogId({
	source: explicitSource,
	backButtonText: explicitButtonText,
	className = "",
}: DogIdProps) {
	const { id, eventId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	const isEventContext =
		location.pathname.includes("/event/") || explicitSource === "event";

	const buttonText =
		explicitButtonText ||
		(isEventContext ? "Retour à l'évènement" : "Retour à la liste");

	const {
		loading: dogLoading,
		error: dogError,
		data: dogData,
	} = useQuery(GET_DOG_BY_ID, {
		variables: { getDogByIdId: Number(id) },
		skip: !id,
	});

	const {
		loading: ownerLoading,
		error: ownerError,
		data: ownerData,
	} = useQuery(GET_OWNER_BY_DOG_ID, {
		variables: { dogId: Number(id) },
		skip: !id,
	});

	const dog: Dog | null = dogData?.getDogById || null;
	const owner: Owner | null = ownerData?.getOwnerByDogId || null;

	const loading = dogLoading || ownerLoading;
	const error = dogError || ownerError;

	const formattedBirthDate = dog?.birthDate
		? new Date(dog.birthDate).toLocaleDateString()
		: "Non renseignée";

	const handleGoBack = () => {
		if (isEventContext && eventId) {
			navigate(`/event/${eventId}`);
		} else {
			navigate(-1);
		}
	};

	const mainClassName = `dogProfile ${isEventContext ? "dogProfile--event" : "dogProfile--profile"} ${className}`;

	return (
		<>
			<PlanningHeader
				title={dog ? `Profil de ${dog.name}` : "Profil"}
				buttonLabel="invite"
				href="mailto:contact@pawplanner.com"
			/>
			{loading ? (
				<p>Chargement...</p>
			) : error ? (
				<p>Erreur: {error.message}</p>
			) : dog ? (
				<main className={mainClassName}>
					<div className="dogProfile__form">
						<div className="dogProfile__form--title">
							<img
								src={
									dog.picture
										? useImageUrl(dog.picture)
										: useImageUrl("/upload/images/defaultdog.jpg")
								}
								alt={dog.name}
							/>
							<h2>{dog.name}</h2>
						</div>
						<div className="dogProfile__form--info">
							<div className="dogProfile__form--detail">
								<h3>Race</h3>
								<p>{dog.breed || "Non renseignée"}</p>
							</div>
							<div className="dogProfile__form--detail">
								<h3>Date de naissance</h3>
								<p>{formattedBirthDate}</p>
							</div>
							{dog.info && (
								<div className="dogProfile__form--detail">
									<h3>Description</h3>
									<p className="dogProfile__form--description">{dog.info}</p>
								</div>
							)}
						</div>
					</div>

					<div className="dogProfile__nav">
						{/* Owner display */}
						{owner && (
							<div className="dogProfile__owner">
								<h1>Propriétaire</h1>
								<div className="eventDetail__participation--wrapper">
									<OwnerBubble owner={owner} />
								</div>
							</div>
						)}

						{isEventContext ? (
							<div className="dogProfile__nav--button">
								<Button
									style={{ type: "thin-btn-light", color: "blue" }}
									onClick={handleGoBack}
								>
									{buttonText}
								</Button>
							</div>
						) : (
							<div className="dogProfile__return--button">
								<Button
									style={{ type: "thin-btn-light", color: "blue" }}
									onClick={handleGoBack}
								>
									{buttonText}
								</Button>
							</div>
						)}
					</div>
				</main>
			) : (
				<p>Chien non trouvé</p>
			)}
		</>
	);
}

export default DogId;

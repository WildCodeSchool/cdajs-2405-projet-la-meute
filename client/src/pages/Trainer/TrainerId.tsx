import Button from "@/components/_atoms/Button/Button";
import LoadingIndicator from "@/components/_atoms/LoadingIndicator/LoadingIndicator";
import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";
import { GET_TRAINER_BY_ID } from "@/graphQL/queries/trainer";
import { safeEmail } from "@/helpers/safeEmail";
import { useImageUrl } from "@/hooks/useImageUrl";
import type { Trainer } from "@/types/User";
import { useQuery } from "@apollo/client";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./TrainerId.scss";

interface TrainerIdProps {
	source?: "event" | "profile";
	backButtonText?: string;
	className?: string;
}

function TrainerId({
	source: explicitSource,
	backButtonText: explicitButtonText,
	className = "",
}: TrainerIdProps) {
	const { id, eventId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	const isEventContext =
		location.pathname.includes("/event/") || explicitSource === "event";

	const buttonText =
		explicitButtonText || (isEventContext ? "Retour à l'évènement" : "Retour");

	const {
		loading: trainerLoading,
		error: trainerError,
		data: trainerData,
	} = useQuery(GET_TRAINER_BY_ID, {
		variables: { id: Number.parseFloat(id || "0") },
		skip: !id,
		fetchPolicy: "network-only",
	});

	const trainer: Trainer | null = trainerData?.getTrainerById || null;
	const loading = trainerLoading;
	const error = trainerError;

	const handleGoBack = () => {
		if (isEventContext && eventId) {
			navigate(`/event/${eventId}`);
		} else {
			navigate(-1);
		}
	};

	return (
		<>
			<PlanningHeader
				title={
					trainer
						? `Profil de ${trainer.firstname} ${trainer.lastname}`
						: "Profil de l'éducateur"
				}
				buttonLabel="invite"
				href="mailto:contact@pawplanner.com"
			/>
			{loading ? (
				<LoadingIndicator />
			) : error ? (
				<div className="trainerDetail__error">
					<p>Une erreur est survenue lors du chargement des données.</p>
					<Button
						style={{ type: "thin-btn-light", color: "blue" }}
						onClick={handleGoBack}
					>
						Retour
					</Button>
				</div>
			) : trainer ? (
				<div className={`trainerDetail ${className}`}>
					<div className="trainerDetail__profile">
						<div className="trainerDetail__profile--card">
							<div className="trainerDetail__profile--title">
								<img
									src={
										trainer.avatar
											? useImageUrl(trainer.avatar)
											: useImageUrl("/upload/images/defaultuserprofile.jpg")
									}
									alt={`${trainer.firstname} ${trainer.lastname}`}
								/>
								<h2>
									{trainer.firstname} {trainer.lastname}
								</h2>
							</div>

							<div className="trainerDetail__info">
								<div className="trainerDetail__info--row">
									<div className="trainerDetail__info--detail">
										<h3>Email</h3>
										<a
											href={`mailto:${trainer.email}`}
											title={`Envoyer un email à ${trainer.firstname} ${trainer.lastname}`}
										>
											{safeEmail(trainer.email)}
										</a>
									</div>
									<div className="trainerDetail__info--detail">
										<h3>Téléphone</h3>
										{trainer.phone_number ? (
											<a
												href={`tel:${trainer.phone_number}`}
												title={`Appeler ${trainer.firstname} ${trainer.lastname}`}
											>
												{trainer.phone_number}
											</a>
										) : (
											<p>Non renseigné</p>
										)}
									</div>
								</div>

								<div className="trainerDetail__info--row">
									<div className="trainerDetail__info--detail">
										<h3>Entreprise</h3>
										<p>{trainer.company_name || "Non renseigné"}</p>
									</div>
									<div className="trainerDetail__info--detail">
										<h3>SIRET</h3>
										<p>{trainer.siret || "Non renseigné"}</p>
									</div>
								</div>

								<div className="trainerDetail__info--row">
									<div className="trainerDetail__info--detail">
										<h3>Ville</h3>
										<p>{trainer.city}</p>
									</div>
									<div className="trainerDetail__info--detail">
										<h3>Code Postal</h3>
										<p>{trainer.postal_code}</p>
									</div>
								</div>

								<div className="trainerDetail__info--detail trainerDetail__info--description">
									<h3>Description</h3>
									<p>{trainer.description || "Non renseigné"}</p>
								</div>
							</div>
						</div>
					</div>

					<div className="trainerDetail__button">
						<Button
							style={{ type: "thin-btn-light", color: "blue" }}
							onClick={handleGoBack}
						>
							{buttonText}
						</Button>
					</div>
				</div>
			) : (
				<p className="trainerDetail__not-found">
					Profil éducateur·trice non trouvé
				</p>
			)}
		</>
	);
}

export default TrainerId;

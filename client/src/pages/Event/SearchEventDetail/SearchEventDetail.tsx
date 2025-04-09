import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useUser } from "@/hooks/useUser";
import { useDateFormatter } from "@/hooks/useDateFormatter";
import { GET_EVENT_BY_ID } from "@/graphQL/queries/event";
import Service from "@/components/_atoms/Service/Service";
import type { ServiceType } from "@/types/Service";

import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";

import "@/pages/Event/EventDetail/EventDetail.scss";

import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader.tsx";
import TrainerBubble from "@/components/_molecules/TrainerBubble/TrainerBubble";

function SearchEventDetail() {
	const navigate = useNavigate();
	const { id } = useParams();
	const eventId = id ? Number(id) : null;
	const { user } = useUser();
	const { extractDate, extractTime } = useDateFormatter();

	const { data, loading, error } = useQuery(GET_EVENT_BY_ID, {
		variables: { eventId },
		skip: !id,
	});

	// States loading management
	if (!user) return <div>Chargement de l'utilisateur...</div>;
	if (loading) return <div>Chargement de l'événement...</div>;
	if (error) return <div>Erreur : {error.message}</div>;
	if (!data?.getEventById) return <div>Aucun événement trouvé.</div>;

	const event = data?.getEventById;

	interface Trainer {
		id: number;
	}

	const handleTrainerClick = (trainer: Trainer) => {
		navigate(`/owner/search/trainer/${trainer.id}`);
	};

	// Function to redirect on edit page of an event
	const handleEditClick = () => {
		navigate(`/trainer/planning/my-events/${id}/edit`);
	};

	// Function to get the real number of available slots
	const calculateAvailableSlots = (
		group_max_size: number,
		participations: any[] | undefined,
	) => {
		// Check if participations exist and is an Array
		const participantsCount =
			participations && Array.isArray(participations)
				? participations.length
				: 0;
		return Math.max(0, group_max_size - participantsCount);
	};
	const availableSlots = calculateAvailableSlots(
		event.group_max_size,
		event.participation,
	);

	return (
		<>
			<PlanningHeader
				title="Planning"
				buttonLabel="event"
				href="/trainer/planning/new"
			/>
			<section className="eventDetail__section">
				<div className="eventDetail__event">
					<div className="eventDetail__event--card">
						<div className="eventDetail__event--title">{event.title}</div>
						<div className="eventDetail__event--service">
							{event.services.map((service: ServiceType) => (
								<Service service={service} key={service.id} />
							))}
						</div>
						{user?.role === "owner" && (
							<span className="createEvent__event eventDetail__margin">
								<label className="eventDetail__leftSlot">
									Nombre de place(s) disponible(s) restante(s)
									<input
										className="createEvent__input"
										type="string"
										defaultValue={
											availableSlots > 0 ? availableSlots : "Complet"
										}
										disabled={true}
									/>
								</label>
							</span>
						)}
						<span className="createEvent__event createEvent__event--dates eventDetail__margin">
							<label className="createEvent__event--date">
								Date de l'évènement
								<input
									className="createEvent__input"
									type="date"
									defaultValue={extractDate(event.startDate)}
									disabled={true}
								/>
							</label>
							<label className="createEvent__event--startTime">
								Heure de début
								<input
									className="createEvent__input"
									type="time"
									defaultValue={extractTime(event.startDate)}
									disabled={true}
								/>
							</label>
							<label className="createEvent__event--endDate">
								Heure de fin
								<input
									className="createEvent__input"
									type="time"
									defaultValue={extractTime(event.endDate)}
									disabled={true}
								/>
							</label>
						</span>
						<TextInput
							className="createEvent__event eventDetail__description eventDetail__margin"
							label="Description"
							inputType="textarea"
							name="description"
							type="description"
							value={event.description}
							onChange={() => ""}
						/>
						{user?.role === "owner" ? (
							<span className="createEvent__event createEvent__event--buttons">
								<Button
									type="button"
									style="btn-dark"
									onClick={handleEditClick}
									className={availableSlots === 0 ? "btn-disabled" : ""}
									disabled={availableSlots === 0 ? true : false}
								>
									S'inscrire à l'événement
								</Button>
							</span>
						) : null}
					</div>
				</div>

				<div className="eventDetail__participation">
					{user?.role === "owner" ? (
						<>
							<div className="eventDetail__participation--title">Éducateur</div>
							<div className="eventDetail__participation--wrapper">
								<TrainerBubble
									trainer={event.trainer}
									onTrainerClick={handleTrainerClick}
								/>
							</div>
						</>
					) : null}
					<div className="eventDetail__price--container">
						<div className="eventDetail__price--divText">
							<p className="eventDetail__price--title">Prix TTC</p>
							<p className="eventDetail__price--paranthesis">
								(par participant)
							</p>
						</div>
						<p className="eventDetail__price--number">{event.price} €</p>
					</div>
				</div>
			</section>
		</>
	);
}

export default SearchEventDetail;

import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";

import { useUser } from "@/hooks/useUser";
import { useDateFormatter } from "@/hooks/useDateFormatter";

import { GET_EVENT_BY_ID } from "@/graphQL/queries/event";
import { DELETE_EVENT_BY_ID } from "@/graphQL/mutations/event";

import type { ServiceType } from "@/types/Service";
import type { Participation } from "@/types/Event";

import "./EventDetail.scss";

import Service from "@/components/_atoms/Service/Service";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader.tsx";
import DogBubbles from "@/components/_atoms/DogsBubbles/DogsBubbles";
import TrainerBubble from "@/components/_atoms/TrainerBubble/TrainerBubble";

import Modal from "@/components/_molecules/Modal/Modal";
import ImgModal from "@/assets/illustrations/chien-ville-point-exclamation.png";

import type { Trainer } from "@/types/User";
import { useState } from "react";

function EventDetail() {
	const navigate = useNavigate();
	const { id } = useParams();
	const eventId = id ? Number(id) : null;
	const { user } = useUser();
	const { extractDate, extractTime } = useDateFormatter();
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const { data, loading, error } = useQuery(GET_EVENT_BY_ID, {
		variables: { eventId },
		skip: !id,
	});

	const [deleteEventById] = useMutation(DELETE_EVENT_BY_ID, {
		onCompleted: () => {
			toast.info("L'événement a été supprimé avec succès !");
			navigate("/trainer/planning");
		},
		onError: (err) => {
			toast.error(`Erreur lors de la suppression : ${err.message}`);
		},
	});

	// States loading management
	if (!user) return <div>Chargement de l'utilisateur...</div>;
	if (loading) return <div>Chargement de l'événement...</div>;
	if (error) return <div>Erreur : {error.message}</div>;
	if (!data?.getEventById) return <div>Aucun événement trouvé.</div>;

	const event = data?.getEventById;
	const dogs = event.participation;

	const handleTrainerClick = (trainer: Partial<Trainer>) => {
		navigate(`/owner/search/trainer/${trainer.id}`);
	};

	// Function to delete /!\ need to be replace by modal logic /!\
	const handleDeleteClick = async () => {
		setShowDeleteModal(true);
	};

	const handleConfirmDelete = async () => {
		await deleteEventById({ variables: { eventId: Number(id) } });
		setShowDeleteModal(false);
	};

	// Function to redirect on the edit page of an event
	const handleEditClick = () => {
		navigate(`/trainer/planning/my-events/${id}/edit`);
	};

	// Function to get the real number of available slots
	const calculateAvailableSlots = (
		group_max_size: number,
		participations: [],
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

						{user?.role === "trainer" ? (
							<span className="createEvent__event createEvent__event--buttons">
								<Button
									type="button"
									style="btn-cancel"
									onClick={handleDeleteClick}
								>
									Supprimer l'événement
								</Button>
								<Button
									type="button"
									style="btn-dark"
									onClick={handleEditClick}
								>
									Modifier l'événement
								</Button>
							</span>
						) : user?.role === "owner" ? (
							<span className="createEvent__event createEvent__event--buttons" />
						) : null}
					</div>
				</div>

				<div className="eventDetail__participation">
					{user?.role === "trainer" ? (
						<>
							<div className="eventDetail__participation--title">
								Participants
							</div>
							<div className="eventDetail__participation--wrapper">
								<DogBubbles
									dogs={dogs.map((p: Participation) => p.dog)}
									maxSize={event.group_max_size}
								/>
							</div>
						</>
					) : user?.role === "owner" ? (
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
			<Modal
				type="warning"
				isOpen={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				customImage={ImgModal}
			>
				<p> Êtes-vous sûr de vouloir supprimer cet événement ?</p>
				<Button
					style="button"
					className="modal__btn--cancelOrange"
					onClick={() => setShowDeleteModal(false)}
				>
					Annuler
				</Button>
				<Button
					style="button"
					className="modal__btn--confirm"
					onClick={handleConfirmDelete}
				>
					Supprimer l'événement
				</Button>
			</Modal>
		</>
	);
}

export default EventDetail;

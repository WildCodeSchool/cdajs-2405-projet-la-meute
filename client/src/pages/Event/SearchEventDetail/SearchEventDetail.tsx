import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-toastify";
import { useDateFormatter } from "@/hooks/useDateFormatter";
import { GET_EVENT_BY_ID } from "@/graphQL/queries/event";
import { GET_ALL_DOGS_BY_OWNER_ID } from "@/graphQL/queries/dog";
import { CREATE_PARTICIPATION } from "@/graphQL/mutations/participation";
import { DELETE_PARTICIPATION_BY_EVENT_AND_DOG_ID } from "@/graphQL/mutations/participation";

import type { ServiceType } from "@/types/Service";
import type { Trainer } from "@/types/User";
import type { Dog } from "@/types/Dog";
import type { Participation } from "@/types/Event";

import "@/pages/Event/EventDetail/EventDetail.scss";

import Service from "@/components/_atoms/Service/Service";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader.tsx";
import TrainerBubble from "@/components/_molecules/TrainerBubble/TrainerBubble";
import Modal from "@/components/_molecules/Modal/Modal";

function SearchEventDetail() {
	const navigate = useNavigate();
	const { id } = useParams();
	const eventId = id ? Number(id) : null;
	const { user } = useUser();
	const { extractDate, extractTime } = useDateFormatter();

	const [createParticipation] = useMutation(CREATE_PARTICIPATION);
	const [deleteParticipation] = useMutation(
		DELETE_PARTICIPATION_BY_EVENT_AND_DOG_ID,
	);

	const [availableSlots, setAvailableSlots] = useState(0);
	const [showModalAdd, setShowModalAdd] = useState(false);
	const [showModalDelete, setShowModalDelete] = useState(false);
	const [availableDogs, setAvailableDogs] = useState<Dog[]>([]);
	const [registeredDogs, setRegisteredDogs] = useState<Dog[]>([]);
	const [selectedDog, setSelectedDog] = useState("");

	const { data: dogsData } = useQuery(GET_ALL_DOGS_BY_OWNER_ID, {
		variables: {
			ownerId: user?.id ? Number(user.id) : null,
		},
		skip: !user?.id,
	});

	const { data, loading, error, refetch } = useQuery(GET_EVENT_BY_ID, {
		variables: { eventId },
		skip: !id,
	});

	const event = data?.getEventById;

	const handleTrainerClick = (trainer: Partial<Trainer>) => {
		navigate(`/owner/search/trainer/${trainer.id}`);
	};

	useEffect(() => {
		if (data?.getEventById) {
			const participantsCount =
				data.getEventById.participation &&
				Array.isArray(data.getEventById.participation)
					? data.getEventById.participation.length
					: 0;

			const slots = Math.max(
				0,
				data.getEventById.group_max_size - participantsCount,
			);

			setAvailableSlots(slots);
		}
	}, [data]);

	useEffect(() => {
		if (dogsData?.getAllDogsByOwnerId && data?.getEventById?.participation) {
			const userDogs: Dog[] = dogsData.getAllDogsByOwnerId;
			const eventParticipations: Participation[] =
				data.getEventById.participation;

			// Identifier les chiens de l'utilisateur qui sont déjà inscrits
			const registeredDogsArray: Dog[] = [];
			const availableDogsArray: Dog[] = [];

			// Pour chaque chien de l'utilisateur
			for (const dog of userDogs) {
				// Vérifier s'il est déjà inscrit à l'événement
				let isRegistered = false;

				for (const participation of eventParticipations) {
					if (participation.dog && participation.dog.id === dog.id) {
						isRegistered = true;
						break;
					}
				}

				if (isRegistered) {
					registeredDogsArray.push(dog);
				} else {
					availableDogsArray.push(dog);
				}
			}

			setAvailableDogs(availableDogsArray);
			setRegisteredDogs(registeredDogsArray);
		}
	}, [dogsData, data]);

	// Extraire les noms pour les menus déroulants
	const availableDogsNames: string[] = availableDogs.map(
		(dog: Dog): string => dog.name,
	);
	const registeredDogsNames: string[] = registeredDogs.map(
		(dog: Dog): string => dog.name,
	);

	const handleDogSelection = (value: string) => {
		setSelectedDog(value);
	};

	const handleConfirmDogParticipation = async () => {
		if (selectedDog && dogsData && dogsData?.getAllDogsByOwnerId) {
			let findDogId = null;

			for (let i = 0; i < dogsData.getAllDogsByOwnerId.length; i++) {
				const dog = dogsData.getAllDogsByOwnerId[i];

				if (dog.name === selectedDog) {
					findDogId = dog.id;
					break;
				}
			}

			if (findDogId) {
				const dogId = findDogId;

				try {
					await createParticipation({
						variables: {
							eventId: Number(eventId),
							dogId: Number(dogId),
						},
					});

					await refetch();

					toast.success("Inscription réussie à cet événement !");
				} catch (error) {
					console.error("Error create participation:", error);
					toast.error("Une erreur est survenue lors de la sauvegarde.");
				}

				setShowModalAdd(false);
			}
		} else {
			alert("Veuillez sélectionner un chien");
		}
	};

	const handleDeleteDogParticipation = async (): Promise<void> => {
		if (selectedDog && dogsData?.getAllDogsByOwnerId) {
			let findDogId: number | null = null;

			for (const dog of dogsData.getAllDogsByOwnerId) {
				if (dog.name === selectedDog) {
					findDogId = dog.id;
					break;
				}
			}

			if (findDogId) {
				const dogId: number = findDogId;

				try {
					await deleteParticipation({
						variables: {
							eventId: Number(eventId),
							dogId: Number(dogId),
						},
					});
					await refetch();

					toast.info("Votre désinscription a été prise en compte.");
				} catch (error) {
					console.error("Error deleting participation:", error);
					toast.error("Une erreur est survenue lors de la sauvegarde.");
				}

				setShowModalDelete(false);
			}
		} else {
			alert("Veuillez sélectionner un chien");
		}
	};

	// States loading management
	if (!user) return <div>Chargement de l'utilisateur...</div>;
	if (loading) return <div>Chargement de l'événement...</div>;
	if (error) return <div>Erreur : {error.message}</div>;
	if (!data?.getEventById) return <div>Aucun événement trouvé.</div>;
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
										value={availableSlots > 0 ? availableSlots : "Complet"}
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
									style="btn-light"
									onClick={() => setShowModalDelete(true)}
									className={
										registeredDogsNames.length === 0 ? "btn-disabled" : ""
									}
									disabled={registeredDogsNames.length === 0}
								>
									Se désinscrire de l'événement
								</Button>

								<Button
									type="button"
									style="btn-dark"
									onClick={() => setShowModalAdd(true)}
									className={
										availableSlots === 0 || availableDogsNames.length === 0
											? "btn-disabled"
											: ""
									}
									disabled={
										availableSlots === 0 || availableDogsNames.length === 0
									}
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
			<Modal
				type="info"
				isOpen={showModalAdd}
				onClose={() => setShowModalAdd(false)}
				selectMenu={availableDogsNames}
				selectPlaceholder="Choisissez un chien"
				onSelectChange={handleDogSelection}
			>
				<p>Avec quel chien souhaitez-vous participer à cet événement ?</p>
				<Button style="btn-dark" onClick={handleConfirmDogParticipation}>
					Confirmer
				</Button>
			</Modal>
			<Modal
				type="info"
				isOpen={showModalDelete}
				onClose={() => setShowModalDelete(false)}
				selectMenu={registeredDogsNames}
				selectPlaceholder="Choisissez un chien"
				onSelectChange={handleDogSelection}
			>
				<p>
					Avec quel chien souhaitez-vous vous désinscrire de cet événement ?
				</p>
				<Button style="btn-dark" onClick={handleDeleteDogParticipation}>
					Confirmer
				</Button>
			</Modal>
		</>
	);
}

export default SearchEventDetail;

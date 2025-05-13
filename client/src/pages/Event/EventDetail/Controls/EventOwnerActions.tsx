import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-toastify";

import { GET_EVENT_BY_ID } from "@/graphQL/queries/event";
import { GET_ALL_DOGS_BY_OWNER_ID } from "@/graphQL/queries/dog";
import { CREATE_PARTICIPATION } from "@/graphQL/mutations/participation";
import { DELETE_PARTICIPATION_BY_EVENT_AND_DOG_ID } from "@/graphQL/mutations/participation";

import type { Dog } from "@/types/Dog";
import type { Participation } from "@/types/Event";

import Button from "@/components/_atoms/Button/Button";
import Modal from "@/components/_molecules/Modal/Modal";

import ImgModalWarning from "@/assets/illustrations/chien-ville-point-exclamation.png";
import ImgModalSuccess from "@/assets/illustrations/chien-high-five-proprietaire-canape-bleu.png";
import LoadingIndicator from "@/components/_atoms/LoadingIndicator/LoadingIndicator";

function EventOwnerActions() {
	const { id } = useParams();
	const eventId = id ? Number(id) : null;
	const { user } = useUser();

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
		fetchPolicy: "no-cache",
	});

	const { data, loading, error, refetch } = useQuery(GET_EVENT_BY_ID, {
		variables: { eventId },
		skip: !id,
		fetchPolicy: "no-cache",
	});

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

			const registeredDogsArray: Dog[] = [];
			const availableDogsArray: Dog[] = [];

			for (const dog of userDogs) {
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

	if (!user) return <LoadingIndicator />;
	if (loading) return <LoadingIndicator />;
	if (error) return <div>Erreur : {error.message}</div>;

	return (
		<>
			<span className="createEvent__event createEvent__event--buttons">
				<Button
					type="button"
					style="btn-cancel"
					onClick={() => setShowModalDelete(true)}
					className={registeredDogsNames.length === 0 ? "btn-disabled" : ""}
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
					disabled={availableSlots === 0 || availableDogsNames.length === 0}
				>
					S'inscrire à l'événement
				</Button>
			</span>
			<Modal
				type="info"
				isOpen={showModalAdd}
				onClose={() => setShowModalAdd(false)}
				customImage={ImgModalSuccess}
				selectMenu={availableDogsNames}
				selectPlaceholder="Choisissez un chien"
				onSelectChange={handleDogSelection}
			>
				<p>Avec quel chien souhaitez-vous participer à cet événement ?</p>
				<Button
					style="button"
					className="modal__btn--cancelBlue"
					onClick={() => setShowModalAdd(false)}
				>
					Annuler
				</Button>
				<Button
					style="btn-confirm"
					onClick={handleConfirmDogParticipation}
					className="eventDetail__btn--confirm"
				>
					Confirmer l'inscription
				</Button>
			</Modal>
			<Modal
				type="warning"
				isOpen={showModalDelete}
				onClose={() => setShowModalDelete(false)}
				customImage={ImgModalWarning}
				selectMenu={registeredDogsNames}
				selectPlaceholder="Choisissez un chien"
				onSelectChange={handleDogSelection}
			>
				<p>
					Avec quel chien souhaitez-vous vous désinscrire de cet événement ?
				</p>
				<Button
					style="button"
					className="modal__btn--cancelOrange"
					onClick={() => setShowModalDelete(false)}
				>
					Annuler
				</Button>
				<Button style="btn-dark" onClick={handleDeleteDogParticipation}>
					Confirmer la désinscription
				</Button>
			</Modal>
		</>
	);
}

export default EventOwnerActions;

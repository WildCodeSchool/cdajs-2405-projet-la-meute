import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useUser } from "@/hooks/useUser";
import { GET_EVENT_BY_ID } from "@/graphQL/queries/event";
import { DELETE_EVENT_BY_ID } from "@/graphQL/mutations/event";
import Service from "@/components/_atoms/Service/Service";
import type { ServiceType } from "@/types/Service";
import { toast } from "react-toastify";

import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
/*import LeafletMap, {
	type leafletMarkerType,
} from "@/components/_atoms/LeafletMap/LeafletMap";*/

import "./EventDetail.scss";

import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader.tsx";
import DogBubbles from "@/components/_molecules/DogsBubbles/DogsBubbles";
import { Participation } from "@/types/Event";

function EventDetail() {
	const navigate = useNavigate();
	const { id } = useParams();
	const eventId = id ? Number(id) : null;
	const { user } = useUser();

	const { data, loading, error } = useQuery(GET_EVENT_BY_ID, {
		variables: { eventId },
		skip: !id,
	});

	const [deleteEventById] = useMutation(DELETE_EVENT_BY_ID, {
		onCompleted: () => {
			toast.success("L'événement a été supprimé avec succès !");
			setTimeout(() => {
				navigate("/trainer/planning");
			}, 1500);
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

	/* const [markerLocation, setMarkerLocation] = useState<leafletMarkerType[]>([]);
	
	// Mettre à jour markerLocation lorsque event change
	useEffect(() => {
		if (event && event.location) {
			setMarkerLocation([{
				lat: event.location.latitude || 48.853495,
				lng: event.location.longitude || 2.349014,
			}]);
		}
	}, [event]);*/

	interface Dog {
		id: number;
		name: string;
	}

	const handleDogClick = (dog: Dog) => {
		navigate(`/trainer/dogs/${dog.id}`);
	};

	// Fonction de suppression -> Ajouter la logique avec la modal ici
	const handleDeleteClick = async () => {
		if (window.confirm("Voulez-vous vraiment supprimer cet événement ?")) {
			await deleteEventById({ variables: { eventId: Number(id) } });
			navigate(`/trainer/planning/`);
		}
	};

	// Fonction pour rediriger vers la page de modification
	const handleEditClick = () => {
		navigate(`/trainer/planning/my-events/${id}/edit`);
	};

	// Function to extract date at format YYYY-MM-DD
	const extractDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toISOString().split("T")[0];
	};

	// Function to extract time at format HH:MM
	const extractTime = (dateString: string) => {
		const date = new Date(dateString);
		// Get only HH:MM in UTC format to not be impact by hour change between seasons
		return date.toISOString().substring(11, 16);
	};

	return (
		<>
			{user?.role === "trainer" && (
				<PlanningHeader
					title="Planning"
					buttonLabel="event"
					href="/trainer/planning/new"
				/>
			)}

			<section className="eventDetail__section">
				<div className="eventDetail__event">
					<div className="eventDetail__event--card">
						<div className="eventDetail__event--title">{event.title}</div>
						<div className="eventDetail__event--service">
							{event.services.map((service: ServiceType) => (
								<Service service={service} key={service.id} />
							))}
						</div>
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
							type="description"
							placeholder={event.description}
						/>
						{/*<label className="createEvent__event eventDetail__event--location eventDetail__margin">
							Localisation
							<LeafletMap
								markerLocation={markerLocation}
								readOnly={true}
								className="eventDetail__event--map"
							/>
						</label>*/}

						{user?.role === "trainer" && (
							<span className="createEvent__event createEvent__event--buttons">
								<Button
									type="button"
									style="btn-light"
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
						)}
					</div>
				</div>
				<div className="eventDetail__participation">
					<div className="eventDetail__participation--title">Participants</div>
					<div className="eventDetail__participation--wrapper">
						<DogBubbles
							dogs={dogs.map((p: Participation) => p.dog)}
							maxSize={event.group_max_size}
							onDogClick={handleDogClick}
						/>
					</div>
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

export default EventDetail;

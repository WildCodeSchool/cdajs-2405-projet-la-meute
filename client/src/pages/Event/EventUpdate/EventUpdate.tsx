import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { useForm } from "@/hooks/useForm";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import LeafletMap, {
	type leafletMarkerType,
} from "@/components/_atoms/LeafletMap/LeafletMap";

import "./EventUpdate.scss";
import { ServiceType } from "@/types/Service";
import { UPDATE_EVENT } from "@/graphQL/mutations/event";
import { GET_EVENT_BY_ID } from "@/graphQL/queries/event";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Service from "@/components/_atoms/Service/Service";
import NewService from "@/components/_atoms/Service/NewService";
import Button from "@/components/_atoms/Button/Button";
// import { Participation } from "@/types/Event";

type endTimeStyleType = {
	outline?: string;
};

interface EventFormValues extends Record<string, unknown> {
	id: number
	title: string;
	date: string;
	startTime: string;
	endTime: string;
	description: string;
	price: string;
	groupMaxSize: string;
}

function EventUpdate() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useUser();
	const [endTimeStyle] = useState<endTimeStyleType>({});
	const [services, setServices] = useState<ServiceType[]>([]);
	const [markerLocation, setMarkerLocation] = useState<leafletMarkerType[]>([
		{ lat: 0, lng: 0 },
	]);
	const { data, loading, error } = useQuery(GET_EVENT_BY_ID, {
		variables: { eventId: Number(id) },
		skip: !id,
		fetchPolicy: "network-only",
	});

	let initialFormValues = {
		id: 0,
		title: "",
		date: "",
		startTime: "",
		endTime: "",
		description: "",
		price: "",
		groupMaxSize: "",
	};

	if (data?.getEventById) {
		const event = data.getEventById;

		const startDate = new Date(event.startDate);
		const endDate = new Date(event.endDate);
		const formattedDate = startDate.toISOString().split("T")[0];
		const formattedStartTime = startDate.toTimeString().slice(0, 5);
		const formattedEndTime = endDate.toTimeString().slice(0, 5);

		if (event.services && services.length === 0) {
			setServices(event.services);
		}

		if (event.location && markerLocation[0].lat === 0 && markerLocation[0].lng === 0) {
			setMarkerLocation([
				{
					lat: event.location.latitude,
					lng: event.location.longitude,
				},
			]);
		}

		initialFormValues = {
			id: event.id,
			title: event.title,
			date: formattedDate || "",
			startTime: formattedStartTime || "",
			endTime: formattedEndTime || "",
			description: event.description || "",
			price: String(event.price) || "",
			groupMaxSize: String(event.group_max_size) || "",
		};
	}

	// // Références pour les champs du formulaire
	// const titleRef = useRef<HTMLInputElement>(null);
	// const dateRef = useRef<HTMLInputElement>(null);
	// const startTimeRef = useRef<HTMLInputElement>(null);
	// const endTimeRef = useRef<HTMLInputElement>(null);
	// const descriptionRef = useRef<HTMLTextAreaElement>(null);
	// const priceRef = useRef<HTMLInputElement>(null);
	// const groupMaxSizeRef = useRef<HTMLInputElement>(null);

	// États pour les validations et données complexes

	const [updateEvent] = useMutation(UPDATE_EVENT);

	const formatDateTime = (date: string, time: string) => {
		const dateTime = new Date(`${date}T${time}:00.000Z`);
		return dateTime.toISOString();
	};

	const event = data?.getEventById;

	console.log(event);

	const editForm = useForm<EventFormValues>({
		initialValues: initialFormValues,
		onSubmit: async (formValues) => {
			await handleSubmit(formValues);
		},
	});

	// // Datas of event id
	// useEffect(() => {
	// 	if (data?.getEventById) {
	// 		const event = data.getEventById;
	// 		const startDate = new Date(event.startDate);
	// 		const endDate = new Date(event.endDate);

	// 		if (titleRef.current) titleRef.current.value = event.title || "";
	// 		if (dateRef.current)
	// 			dateRef.current.value = startDate.toISOString().split("T")[0] || "";
	// 		if (startTimeRef.current)
	// 			startTimeRef.current.value = startDate.toTimeString().slice(0, 5) || "";
	// 		if (endTimeRef.current)
	// 			endTimeRef.current.value = endDate.toTimeString().slice(0, 5) || "";
	// 		if (descriptionRef.current)
	// 			descriptionRef.current.value = event.description || "";
	// 		if (priceRef.current) priceRef.current.value = String(event.price) || "";
	// 		if (groupMaxSizeRef.current)
	// 			groupMaxSizeRef.current.value = String(event.group_max_size) || "";

	// 		// Services and Location states
	// 		setServices(event.services || []);
	// 		if (event.location) {
	// 			setMarkerLocation([
	// 				{
	// 					lat: event.location.latitude,
	// 					lng: event.location.longitude,
	// 				},
	// 			]);
	// 		}
	// 	}
	// }, [data]);

	// const handleEndTimeBlur = () => {
	// 	if (editForm.values.startTime && editForm.values.endTime) {
	// 		if (editForm.values.startTime >= editForm.values.endTime) {
	// 			setEndTimeStyle({ outline: "2px solid red" });
	// 			toast.error(
	// 				"Attention : L'heure de fin de l'évènement doit avoir lieu après l'heure de début 🐶",
	// 			);
	// 		} else {
	// 			setEndTimeStyle({});
	// 		}
	// 	}
	// };


	const handleSubmit = async (formValues: EventFormValues) => {

		if (user?.role === "trainer") {
			try {
				const servicesArray = services.map((service) => Number(service.id));

				const eventData = {
					eventId: Number(id),
					title: formValues.title,
					description: formValues.description,
					startDate: formatDateTime(
						formValues.date,
						formValues.startTime,
					),
					endDate: formatDateTime(
						formValues.date,
						formValues.endTime,
					),
					price: Number(formValues.price),
					groupMaxSize: Number(formValues.groupMaxSize),
					location: {
						latitude: markerLocation ? markerLocation[0].lat : 48.853495,
						longitude: markerLocation ? markerLocation[0].lng : 2.349014,
					},
					trainerId: Number(user?.id),
					serviceIds: servicesArray,
				};

				await updateEvent({
					variables: eventData,
					// Allow to refresh datas without refresh page after submit form when navigate is execute on the id page of event
					update: (cache, { data }) => {
						const updatedEvent = data?.updateEvent;

						if (updatedEvent) {
							cache.writeQuery({
								query: GET_EVENT_BY_ID,
								variables: { eventId: Number(id) },
								data: { getEventById: updatedEvent },
							});
						}
					},
				});
				toast.success("L'évènement a été mis à jour avec succès.");
				navigate(`/trainer/planning/my-events/${id}`);
			} catch (error) {
				console.error("Erreur lors de la mise à jour de l'évènement:", error);
				toast.error(
					"Une erreur s'est produite lors de la mise à jour de l'événement.",
				);
			}
		}
	};

	if (loading) return <p>Chargement de l'événement...</p>;
	if (error) return <p>Erreur: Impossible de charger l'événement</p>;
	if (!data || !data.getEventById) return <p>Aucun événement trouvé.</p>;

	return (
		<section className="sectionEvent">
			<form className="createEvent" onSubmit={editForm.handleSubmit}>
				<h1 className="createEvent__title">Modification de l'évènement</h1>

				<TextInput
					className="createEvent__event createEvent__event--title"
					label="Nom de l'évènement"
					required
					type="title"
					name="title"
					value={editForm.values.title}
					onChange={editForm.handleChange}
				/>

				<label className="createEvent__event createEvent__event--services">
					Etiquettes
					<p className="createEvent__event--services--p">
						Les étiquettes donneront quelques mots-clés en un coup d'oeil à vos
						clients, vous pouvez en choisir jusqu'à 3.
					</p>
					<div className="createEvent__event--services--newService">
						{services.map((service) => (
							<Service key={service.id} service={service} />
						))}
						<NewService services={services} setServices={setServices} />
					</div>
				</label>

				<span className="createEvent__event createEvent__event--dates">
					<label className="createEvent__event--date">
						Date de l'évènement&nbsp;*
						<input
							className="createEvent__input"
							type="date"
							required
							name="date"
							value={editForm.values.date}
							onChange={editForm.handleChange}
						/>
					</label>
					<label className="createEvent__event--startTime">
						Heure de début&nbsp;*
						<input
							className="createEvent__input"
							type="time"
							name="startTime"
							value={editForm.values.startTime}
							onChange={editForm.handleChange}
							required
						/>
					</label>
					<label className="createEvent__event--endDate">
						Heure de fin&nbsp;*
						<input
							className="createEvent__input"
							style={endTimeStyle}
							type="time"
							name="endTime"
							value={editForm.values.endTime}
							onChange={editForm.handleChange}
							// onBlur={handleEndTimeBlur}
							required
						/>
					</label>
				</span>

				<TextInput
					className="createEvent__event createEvent__event--description"
					label="Description"
					placeholder="Détaillez ici l'évènement, son déroulé, les choses à prévoir."
					inputType="textarea"
					type="description"
					name="description"
					value={editForm.values.description}
					onChange={editForm.handleChange}
					required
				/>

				<span className="createEvent__event createEvent__event--prices">
					<label className="createEvent__event--price">
						Prix par chien en euros *
						<span>
							<input
								className="createEvent__input"
								placeholder="Prix TTC"
								type="number"
								min={0}
								name="price"
								value={editForm.values.price}
								onChange={editForm.handleChange}
								required
							/>
							<p>€</p>
						</span>
					</label>
					<label className="createEvent__event--groupMaxSize">
						Nombre maximum de chiens participants&nbsp;*
						<input
							className="createEvent__input"
							placeholder="1 minimum"
							type="number"
							min={1}
							name="groupMaxSize"
							value={editForm.values.groupMaxSize}
							onChange={editForm.handleChange}
							required
						/>
					</label>
				</span>

				<span className="createEvent__event--location">
					<label>Localisation&nbsp;*</label>
					<LeafletMap setMarkerLocation={setMarkerLocation} />
				</span>

				<span className="createEvent__event createEvent__event--buttons">
					<Button type="button" style="btn-light" onClick={() => navigate(-1)}>
						Annuler les modifications
					</Button>
					<Button type="submit" style="btn-dark">
						Modifier l'évènement
					</Button>
				</span>
			</form>
		</section>
	);
}

export default EventUpdate;

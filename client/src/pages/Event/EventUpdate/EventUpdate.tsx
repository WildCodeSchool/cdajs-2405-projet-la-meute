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
import type { ServiceType } from "@/types/Service";
import { UPDATE_EVENT } from "@/graphQL/mutations/event";
import { GET_EVENT_BY_ID } from "@/graphQL/queries/event";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Service from "@/components/_atoms/Service/Service";
import NewService from "@/components/_atoms/Service/NewService";
import Button from "@/components/_atoms/Button/Button";

import Modal from "@/components/_molecules/Modal/Modal";
import ImgModalWarning from "@/assets/illustrations/chien-ville-point-exclamation.png";
import ImgModalSuccess from "@/assets/illustrations/chien-high-five-proprietaire-canape-bleu.png";

type endTimeStyleType = {
	outline?: string;
};

interface EventFormValues extends Record<string, unknown> {
	id: number;
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
	const [endTimeStyle, setEndTimeStyle] = useState<endTimeStyleType>({});
	const [services, setServices] = useState<ServiceType[]>([]);
	const [markerLocation, setMarkerLocation] = useState<leafletMarkerType[]>([
		{ lat: 0, lng: 0 },
	]);
	const [showCancelModal, setShowCancelModal] = useState(false);
	const [showSaveModal, setShowSaveModal] = useState(false);
	const { data, loading, error } = useQuery(GET_EVENT_BY_ID, {
		variables: { eventId: Number(id) },
		skip: !id,
		fetchPolicy: "network-only",
	});

	const [updateEvent] = useMutation(UPDATE_EVENT);

	const formatDateTime = (date: string, time: string) => {
		const dateTime = new Date(`${date}T${time}:00.000Z`);
		return dateTime.toISOString();
	};

	useEffect(() => {
		if (data?.getEventById) {
			const startDate = new Date(data.getEventById.startDate);
			const endDate = new Date(data.getEventById.endDate);
			const formattedDate = startDate.toISOString().split("T")[0];
			const formattedStartTime = startDate.toTimeString().slice(0, 5);
			const formattedEndTime = endDate.toTimeString().slice(0, 5);

			editForm.setValues({
				id: Number(id),
				title: data.getEventById.title || "",
				date: formattedDate || "",
				startTime: formattedStartTime || "",
				endTime: formattedEndTime || "",
				description: data.getEventById.description || "",
				price: String(data.getEventById.price || ""),
				groupMaxSize: String(data.getEventById.group_max_size || ""),
			});
		}
	}, [data, id]);

	const editForm = useForm<EventFormValues>({
		initialValues: {
			id: Number(id),
			title: "",
			date: "",
			startTime: "",
			endTime: "",
			description: "",
			price: "",
			groupMaxSize: "",
		},
		onSubmit: async (formValues) => {
			await handleSubmit(formValues);
		},
	});

	const handleEndTimeBlur = () => {
		if (editForm.values.startTime && editForm.values.endTime) {
			if (editForm.values.startTime >= editForm.values.endTime) {
				setEndTimeStyle({ outline: "2px solid red" });
				toast.error(
					"Attention : L'heure de fin de l'évènement doit avoir lieu après l'heure de début 🐶",
				);
			} else {
				setEndTimeStyle({});
			}
		}
	};

	const handleSubmit = async (formValues: EventFormValues) => {
		if (user?.role === "trainer") {
			try {
				const servicesArray = services.map((service) => Number(service.id));

				const eventData = {
					eventId: Number(id),
					title: formValues.title,
					description: formValues.description,
					startDate: formatDateTime(formValues.date, formValues.startTime),
					endDate: formatDateTime(formValues.date, formValues.endTime),
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
				navigate(`/event/${id}`);
			} catch (error) {
				console.error("Erreur lors de la mise à jour de l'évènement:", error);
				toast.error(
					"Une erreur s'est produite lors de la mise à jour de l'événement.",
				);
			}
		}
	};

	const handleFormValidate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (editForm.values.startTime >= editForm.values.endTime) {
			setEndTimeStyle({ outline: "2px solid red" });
			toast.error(
				"Attention : L'heure de fin de l'évènement doit avoir lieu après l'heure de début 🐶",
			);
			return;
		}
		setShowSaveModal(true);
	};

	const handleConfirmSave = async () => {
		await handleSubmit(editForm.values);
		setShowSaveModal(false);
	};

	const handleConfirmCancel = () => {
		setShowCancelModal(false);
		navigate(-1);
	};

	if (loading) return <p>Chargement de l'événement...</p>;
	if (error) return <p>Erreur: Impossible de charger l'événement</p>;
	if (!data || !data.getEventById) return <p>Aucun événement trouvé.</p>;

	return (
		<section className="sectionEvent">
			<form className="createEvent" onSubmit={handleFormValidate}>
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

				{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
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
							onBlur={handleEndTimeBlur}
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
					{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
					<label>Localisation&nbsp;*</label>
					<LeafletMap setMarkerLocation={setMarkerLocation} />
				</span>

				<span className="createEvent__event createEvent__event--buttons">
					<Button
						type="button"
						style="btn-cancel"
						onClick={() => setShowCancelModal(true)}
					>
						Annuler les modifications
					</Button>
					<Button type="submit" style="btn-dark">
						Modifier l'évènement
					</Button>
				</span>
			</form>
			<Modal
				type="warning"
				isOpen={showCancelModal}
				onClose={() => setShowCancelModal(false)}
				customImage={ImgModalWarning}
			>
				<p>Êtes-vous sûr de vouloir annuler vos modifications ?</p>
				<Button
					style="button"
					className="modal__btn--cancelOrange"
					onClick={() => setShowCancelModal(false)}
				>
					Continuer à modifier
				</Button>
				<Button style="btn-dark" onClick={handleConfirmCancel}>
					Annuler les modifications
				</Button>
			</Modal>

			<Modal
				type="info"
				isOpen={showSaveModal}
				onClose={() => setShowSaveModal(false)}
				customImage={ImgModalSuccess}
			>
				<p>Confirmez-vous les modifications de cet événement ?</p>
				<Button
					style="button"
					className="modal__btn--cancelBlue"
					onClick={() => setShowSaveModal(false)}
				>
					Continuer à modifier
				</Button>
				<Button
					style="btn-dark"
					className="modal__btn--successGreen"
					onClick={handleConfirmSave}
				>
					Confirmer les modifications
				</Button>
			</Modal>
		</section>
	);
}

export default EventUpdate;

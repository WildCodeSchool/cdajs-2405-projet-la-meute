import "./EventForm.scss";
import { useState } from "react";
import type { Event } from "@/types/Event";
import { useNavigate } from "react-router-dom";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import type { leafletMarkerType } from "@/components/_atoms/LeafletMap/LeafletMap";
import { useForm } from "@/hooks/useForm";
import { useUser } from "@/hooks/useUser";
import type { ServiceType } from "@/types/Service";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import LeafletMap from "@/components/_atoms/LeafletMap/LeafletMap";
import NewService from "@/components/_atoms/Service/NewService";
import Service from "@/components/_atoms/Service/Service";
import { CREATE_EVENT, UPDATE_EVENT } from "@/graphQL/mutations/event";
import EventFormActions from "./Controls/EventFormActions";

type endTimeStyleType = {
	outline?: string;
};

interface EventFormProps {
	mode: "create" | "update";
	initialData?: Event | null;
}

interface EventFormValues extends Record<string, unknown> {
	id?: number;
	title: string;
	date: string;
	startTime: string;
	endTime: string;
	description: string;
	price: string | number;
	groupMaxSize: string | number;
}

function EventForm({ mode = "create", initialData = null }: EventFormProps) {
	const navigate = useNavigate();
	const { user } = useUser();
	const [endTimeStyle, setEndTimeStyle] = useState<endTimeStyleType>();
	const [services, setServices] = useState<ServiceType[]>([]);
	const [markerLocation, setMarkerLocation] = useState<leafletMarkerType[]>();

	const isCreate = mode === "create";

	const query = isCreate ? CREATE_EVENT : UPDATE_EVENT;
	const [selectedQuery] = useMutation(query);

	const formattedDate = initialData?.startDate
		? new Date(initialData.startDate).toISOString().split("T")[0]
		: "";

	const form = useForm<EventFormValues>({
		initialValues: {
			id: Number(initialData?.id),
			title: initialData?.title || "",
			date: formattedDate,
			startTime: initialData?.startTime || "",
			endTime: initialData?.endTime || "",
			description: initialData?.description || "",
			price: initialData?.price || "",
			groupMaxSize: initialData?.group_max_size || "",
			services: initialData?.services || [],
		},
		onSubmit: async (formValues) => {
			await handleSubmit(formValues);
		},
	});

	const formatDateTime = (date: string, time: string) => {
		const dateTime = new Date(`${date}T${time}:00.000Z`);
		return dateTime.toISOString();
	};

	const validateTimes = (startTime: string, endTime: string) => {
		if (startTime >= endTime) {
			setEndTimeStyle({ outline: "2px solid red" });
			toast.error(
				"Attention : L'heure de fin de l'évènement doit avoir lieu après l'heure de début 🐶",
			);
			return false;
		}
		setEndTimeStyle({});
		return true;
	};

	const handleEndTimeBlur = () => {
		if (form.values.startTime && form.values.endTime) {
			validateTimes(form.values.startTime, form.values.endTime);
		}
	};

	const handleSubmit = async (formValues: EventFormValues) => {
		if (!validateTimes(formValues.startTime, formValues.endTime)) {
			return;
		}

		if (user?.role === "trainer") {
			const servicesArray = services.map((service) => Number(service.id));

			const eventData = {
				eventId: Number(formValues.id),
				endDate: formatDateTime(formValues.date, formValues.endTime),
				startDate: formatDateTime(formValues.date, formValues.startTime),
				price: Number(formValues.price),
				groupMaxSize: Number(formValues.groupMaxSize),
				location: {
					latitude: markerLocation ? markerLocation[0].lat : 48.853495,
					longitude: markerLocation ? markerLocation[0].lng : 2.349014,
				},
				description: formValues.description,
				title: formValues.title,
				trainerId: Number(user?.id),
				serviceIds: servicesArray,
			};

			try {
				const { data } = await selectedQuery({
					variables: {
						...eventData,
					},
				});
				toast.success(
					`L'évènement a été ${isCreate ? "créé" : "mis à jour"} avec succès.`,
				);
				navigate(
					`/event/${isCreate ? data.createEvent.id : eventData.eventId}`,
				);
			} catch (error) {
				console.error(
					`Erreur lors de la ${isCreate ? "création" : "mise à jour"} de l'évènement:`,
					error,
				);
				toast.error(
					`Une erreur s'est produite lors de la ${isCreate ? "création" : "mise à jour"} de l'événement.`,
				);
			}
		}
	};

	return (
		<section className="sectionEvent">
			<form className="createEvent" onSubmit={form.handleSubmit}>
				<h1 className="createEvent__title">
					{isCreate ? "Création d'évènement" : "Modification de l'évènement"}
				</h1>

				<TextInput
					className="createEvent__event createEvent__event--title"
					label="Nom de l'évènement"
					placeholder="Entrez le nom de l'évènement"
					required
					type="title"
					name="title"
					value={form.values.title}
					onChange={form.handleChange}
				/>

				{/* biome-ignore lint/a11y/noLabelWithoutControl: uniformized label even though this input isn't treated as one */}
				<label className="createEvent__event createEvent__event--services">
					Etiquettes
					<p className="createEvent__event--services--p">
						Les étiquettes donneront quelques mots-clés en un coup d’oeil à vos
						clients, vous pouvez en choisir jusqu’à 3.
					</p>
					<div className="createEvent__event--services--newService">
						{isCreate
							? services.map((service) => (
									<Service key={service.id} service={service} />
								))
							: initialData?.services.map((service) => (
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
							name="date"
							value={form.values.date}
							onChange={form.handleChange}
							required
						/>
					</label>
					<label className="createEvent__event--startTime">
						Heure de début&nbsp;*
						<input
							className="createEvent__input"
							type="time"
							name="startTime"
							value={form.values.startTime}
							onChange={form.handleChange}
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
							value={form.values.endTime}
							onChange={form.handleChange}
							onBlur={handleEndTimeBlur}
							required
						/>
						{/* FIXME: (improvement) endDate should be able to go over 24h */}
					</label>
				</span>

				<TextInput
					className="createEvent__event createEvent__event--description"
					label="Description"
					placeholder="Détaillez ici l'évènement, son déroulé, les choses à prévoir."
					inputType="textarea"
					type="description"
					name="description"
					value={form.values.description}
					onChange={form.handleChange}
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
								value={form.values.price}
								onChange={form.handleChange}
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
							value={form.values.groupMaxSize}
							onChange={form.handleChange}
							required
						/>
					</label>
				</span>
				<span className="createEvent__event--location">
					{/* biome-ignore lint/a11y/noLabelWithoutControl: uniformized label even though this input isn't treated as one */}
					<label>Localisation&nbsp;*</label>
					<LeafletMap setMarkerLocation={setMarkerLocation} />
				</span>

				<EventFormActions isCreate={isCreate} />
			</form>
		</section>
	);
}

export default EventForm;

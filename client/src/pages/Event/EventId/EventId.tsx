import { useRef, useState } from "react";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import "./EventId.scss";
import Service from "@/components/_atoms/Service/Service";
import NewService from "@/components/_atoms/Service/NewService";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-toastify";
import type { ServiceType } from "@/types/Service";
import { useMutation } from "@apollo/client";
import { CREATE_EVENT } from "@/graphQL/mutations/event";

type endTimeStyleType = {
	outline?: string;
};

function EventId() {
	const navigate = useNavigate();
	const { user } = useUser();
	const [endTimeStyle, setEndTimeStyle] = useState<endTimeStyleType>();
	const [services, setServices] = useState<ServiceType[]>([]);

	const [createEvent] = useMutation(CREATE_EVENT);

	const titleRef = useRef<HTMLInputElement>(null);
	const dateRef = useRef<HTMLInputElement>(null);
	const startTimeRef = useRef<HTMLInputElement>(null);
	const endTimeRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const priceRef = useRef<HTMLInputElement>(null);
	const groupMaxSizeRef = useRef<HTMLInputElement>(null);
	const locationRef = useRef<HTMLInputElement>(null);

	const formatDateTime = (date: string, time: string) => {
		const dateTime = new Date(`${date}T${time}:00.000Z`);
		return dateTime.toISOString();
	};

	const handleEndTimeBlur = () => {
		if (startTimeRef.current?.value && endTimeRef.current?.value) {
			if (startTimeRef.current.value >= endTimeRef.current.value) {
				setEndTimeStyle({ outline: "2px solid red" });
				toast.error(
					"Attention : L'heure de fin de l'évènement doit avoir lieu après l'heure de début 🐶",
				);
			} else {
				setEndTimeStyle({});
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const date = dateRef.current?.value;

		if (user?.role === "trainer") {
			const servicesArray = services.map((service) => service.id);

			const eventData = {
				title: titleRef.current?.value,
				services: servicesArray,
				startDate: formatDateTime(
					date as string,
					startTimeRef.current?.value as string,
				),
				endDate: formatDateTime(
					date as string,
					endTimeRef.current?.value as string,
				),
				description: descriptionRef.current?.value,
				price: Number(priceRef.current?.value),
				groupMaxSize: Number(groupMaxSizeRef.current?.value),
				//location: locationRef.current?.value,
				location: {
					latitude: 10,
					longitude: 10,
				},
				trainerId: Number(user?.id),
			};

			try {
				await createEvent({
					variables: {
						...eventData,
					},
				});
				toast.success("L'évènement a été créé avec succès.");
			} catch (error) {
				console.error("Erreur lors de la création de l'évènement:", error);
				toast.error(
					"Une erreur s'est produite lors de la création de l'événement.",
				);
			}
		}
	};

	return (
		<form className="createEvent" onSubmit={handleSubmit}>
			<h1 className="createEvent__title">Création d'évènement</h1>

			<TextInput
				className="createEvent__event createEvent__event--title"
				label="Nom de l'évènement"
				placeholder="Entrez le nom de l'évènement"
				required
				ref={titleRef}
			/>

			{/* biome-ignore lint/a11y/noLabelWithoutControl: uniformized label even though this input isn't treated as one */}
			<label className="createEvent__event createEvent__event--services">
				Etiquettes
				<p className="createEvent__event--services--p">
					Les étiquettes donneront quelques mots-clés en un coup d’oeil à vos
					clients, vous pouvez en choisir jusqu’à 3.
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
						ref={dateRef}
						required
					/>
				</label>
				<label className="createEvent__event--startTime">
					Heure de début&nbsp;*
					<input
						className="createEvent__input"
						type="time"
						ref={startTimeRef}
						required
					/>
				</label>
				<label className="createEvent__event--endDate">
					Heure de fin&nbsp;*
					<input
						className="createEvent__input"
						style={endTimeStyle}
						type="time"
						ref={endTimeRef}
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
				ref={descriptionRef}
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
							ref={priceRef}
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
						ref={groupMaxSizeRef}
						required
					/>
				</label>
			</span>

			<label className="createEvent__event createEvent__event--location">
				Localisation&nbsp;*
				<input
					className="createEvent__input"
					placeholder="Entrez une adresse ou des coordonnées"
					type="text"
					ref={locationRef}
					required
				/>
			</label>
			<div className="createEvent__event--map">{/* map */}</div>

			<span className="createEvent__event createEvent__event--buttons">
				<Button type="button" style="btn-light" onClick={() => navigate(-1)}>
					Annuler
				</Button>
				<Button type="submit" style="btn-dark">
					Créer l'évènement
				</Button>
			</span>
		</form>
	);
}

export default EventId;

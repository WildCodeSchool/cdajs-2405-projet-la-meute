import { useEffect, useRef, useState } from "react";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import "./EventId.scss";
import Tag from "@/components/_atoms/Tag/Tag";
import NewTag from "@/components/_atoms/Tag/NewTag";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-toastify";

type endTimeStyleType = {
	outline?: string;
};

function EventId() {
	const navigate = useNavigate();
	const { user } = useUser();
	const [endTimeStyle, setEndTimeStyle] = useState<endTimeStyleType>();

	const titleRef = useRef<HTMLInputElement>(null);
	const servicesRef = useRef<HTMLSelectElement>(null);
	const dateRef = useRef<HTMLInputElement>(null);
	const startTimeRef = useRef<HTMLInputElement>(null);
	const endTimeRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const priceRef = useRef<HTMLInputElement>(null);
	const groupMaxSizeRef = useRef<HTMLInputElement>(null);
	const locationRef = useRef<HTMLInputElement>(null);

	const formatDateTime = (date: string, time: string) => `${date} ${time}:00`;

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
			const eventData = {
				title: titleRef.current?.value,
				services: servicesRef.current?.value,
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
				location: locationRef.current?.value,
				trainerId: user?.id,
			};
			console.log("Eventdata", eventData);
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

			<label className="createEvent__event createEvent__event--tags">
				Etiquettes
				<p>
					Les étiquettes donneront quelques mots-clés en un coup d’oeil à vos
					clients, vous pouvez en choisir jusqu’à 3.
				</p>
				<div>
					<Tag color={"#04272F"} href={""}>
						😁&nbsp;etiquette 1
					</Tag>
					<Tag color={"#FFBF80"} href={""}>
						😍&nbsp;etiquette 2
					</Tag>
					<NewTag href={""} />
				</div>
				<select ref={servicesRef}>
					<option>Option 1</option>
					<option>Option 2</option>
				</select>
			</label>

			<span className="createEvent__event createEvent__event--dates">
				<label className="createEvent__event--date">
					Date de l'évènement&nbsp;*
					<input type="date" ref={dateRef} required />
				</label>
				<label className="createEvent__event--startTime">
					Heure de début&nbsp;*
					<input type="time" ref={startTimeRef} required />
				</label>
				<label className="createEvent__event--endDate">
					Heure de fin&nbsp;*
					<input
						style={endTimeStyle}
						type="time"
						ref={endTimeRef}
						required
						onBlur={handleEndTimeBlur}
					/>
					{/* FIXME: (improvement) endDate should be able to go over 24h */}
				</label>
			</span>

			<TextInput
				className="createEvent__event createEvent__event--description"
				label="Description"
				placeholder="Détaillez ici l'évènement, son déroulé, les choses à prévoir."
				inputType="textarea"
				required
				ref={descriptionRef}
			/>

			<span className="createEvent__event createEvent__event--prices">
				<label className="createEvent__event--price">
					Prix par chien&nbsp;*
					<input
						placeholder="Prix TTC en euros"
						type="number"
						min={1}
						required
						ref={priceRef}
					/>
				</label>
				<label className="createEvent__event--groupMaxSize">
					Nombre de chiens participants&nbsp;*
					<input
						placeholder="Nombre maximum"
						type="number"
						min={1}
						required
						ref={groupMaxSizeRef}
					/>
				</label>
			</span>

			<label className="createEvent__event createEvent__event--location">
				Localisation&nbsp;*
				<input
					placeholder="Entrez une adresse ou des coordonnées"
					type="text"
					required
					ref={locationRef}
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

import { useRef } from "react";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import "./EventId.scss";
import Tag from "@/components/_atoms/Tag/Tag";
import NewTag from "@/components/_atoms/Tag/NewTag";
import { useNavigate } from "react-router-dom";

function EventId() {
	const navigate = useNavigate();

	const titleRef = useRef<HTMLInputElement>(null);
	const tagsRef = useRef<HTMLSelectElement>(null);
	const dateRef = useRef<HTMLInputElement>(null);
	const startTimeRef = useRef<HTMLInputElement>(null);
	const durationRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLTextAreaElement>(null);
	const priceRef = useRef<HTMLInputElement>(null);
	const participantsRef = useRef<HTMLInputElement>(null);
	const locationRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const eventData = {
			title: titleRef.current?.value,
			tags: tagsRef.current?.value,
			date: dateRef.current?.value,
			startTime: startTimeRef.current?.value,
			duration: durationRef.current?.value,
			description: descriptionRef.current?.value,
			price: priceRef.current?.value,
			participants: participantsRef.current?.value,
			location: locationRef.current?.value,
		};
		console.log("Eventdata", eventData);
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
				<select ref={tagsRef}>
					<option>Option 1</option>
					<option>Option 2</option>
				</select>
			</label>

			<span className="createEvent__event createEvent__event--dates">
				<label className="createEvent__event--date">
					Date de l'évènement *
					<input type="date" required ref={dateRef} />
				</label>
				<label className="createEvent__event--time">
					Heure de début *
					<input type="time" required ref={startTimeRef} />
				</label>
				<label className="createEvent__event--duration">
					Durée *
					<input type="time" required ref={durationRef} />
					{/* FIXME: (improvement) duration should be able to go over 24h */}
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
					Prix par chien *
					<span>
						<input
							placeholder="Prix TTC en euros"
							type="number"
							min={1}
							required
							ref={priceRef}
						/>
						<p>€</p>
					</span>
				</label>
				<label>
					Nombre de chiens participants *
					<input
						placeholder="Nombre maximum"
						type="number"
						min={1}
						required
						ref={participantsRef}
					/>
				</label>
			</span>

			<label className="createEvent__event createEvent__event--location">
				Localisation *
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

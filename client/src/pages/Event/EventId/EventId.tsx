import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Button from "@/components/_atoms/Button/Button";
import "./EventId.scss";

function EventId() {
	const titleRef = useRef<HTMLInputElement>(null);
	const [eventName, setEventName] = useState("");
	const [tags, setTags] = useState("");
	const [eventDate, setEventDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [duration, setDuration] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState<number | "">("");
	const [participants, setParticipants] = useState<number | "">("");
	const [location, setLocation] = useState<LatLngExpression | null>([
		48.8566, 2.3522,
	]); // Paris par défaut

	// Fonction pour sélectionner un point sur la carte
	function LocationMarker() {
		useMapEvents({
			click(e) {
				setLocation([e.latlng.lat, e.latlng.lng]);
			},
		});

		return location ? <Marker position={location} /> : null;
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({
			eventName,
			tags,
			eventDate,
			startTime,
			duration,
			description,
			price,
			participants,
			location,
		});
		alert("Événement créé avec succès !");
	};

	return (
		<form onSubmit={handleSubmit} className="event-form">
			<h1>Création d'évènement</h1>

			<TextInput
				label="Nom de l'évènement"
				placeholder="Entrez le nom de l'évènement"
				required
				ref={titleRef}
				value={eventName}
				onChange={(e) => setEventName(e.target.value)}
			/>

			<label htmlFor="tags">Étiquettes</label>
			<select
				id="tags"
				value={tags}
				onChange={(e) => setTags(e.target.value)}
				required
			>
				<option value="">Sélectionner une étiquette</option>
				<option value="dressage">Dressage</option>
				<option value="agility">Agility</option>
			</select>

			<label htmlFor="event-date">Date de l'évènement</label>
			<input
				type="date"
				id="event-date"
				value={eventDate}
				onChange={(e) => setEventDate(e.target.value)}
				required
			/>

			<label htmlFor="start-time">Heure de début</label>
			<input
				type="time"
				id="start-time"
				value={startTime}
				onChange={(e) => setStartTime(e.target.value)}
				required
			/>

			<label htmlFor="duration">Durée</label>
			<input
				type="time"
				id="duration"
				value={duration}
				onChange={(e) => setDuration(e.target.value)}
				required
			/>

			<TextInput
				label="Description"
				inputType="textarea"
				required
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>

			<label htmlFor="price">Prix par chien (€)</label>
			<input
				type="number"
				id="price"
				value={price}
				onChange={(e) => setPrice(Number(e.target.value) || "")}
				required
			/>

			<label htmlFor="participants">Nombre de participants</label>
			<input
				type="number"
				id="participants"
				value={participants}
				onChange={(e) => setParticipants(Number(e.target.value) || "")}
				required
			/>

			<label>Localisation de l'évènement</label>
			<MapContainer center={location} zoom={13} className="event-map">
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<LocationMarker />
			</MapContainer>

			<div className="event-form-actions">
				<Button type="button" style="btn-light" href="back">
					Annuler
				</Button>
				<Button type="submit" style="btn-dark">
					Créer l'évènement
				</Button>
			</div>
		</form>
	);
}

export default EventId;

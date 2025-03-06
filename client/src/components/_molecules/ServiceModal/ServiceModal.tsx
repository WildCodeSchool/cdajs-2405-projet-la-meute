import { useState } from "react";
import "./ServiceModal.scss";
import Button from "@/components/_atoms/Button/Button";
import { useQuery } from "@apollo/client";
import { GET_ALL_SERVICES } from "@/graphQL/queries/service";
import type { ServiceType } from "@/types/Service";
import Service from "@/components/_atoms/Service/Service";

export default function ServiceModal({ onClose }: { onClose: () => void }) {
	//const [newService, setNewService] = useState("");
	const [chosenServices, setChosenServices] = useState<ServiceType[]>([]);

	const { data, loading, error } = useQuery(GET_ALL_SERVICES);

	if (loading) return <p>Chargement des services...</p>;
	if (error) return <p>Erreur : {error.message}</p>;
	if (!data || !data.getAllServices) return <p>Aucun service disponible.</p>;

	const handleSelectService = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedService = data.getAllServices.find(
			(serv: ServiceType) => serv.id === e.target.value,
		);

		if (!selectedService) return;

		// Si déjà sélectionné
		if (chosenServices.some((serv) => serv.id === selectedService.id)) {
			alert("Ce service est déjà sélectionné."); // FIXME: toast ?
			return;
		}

		// Limiter à 3 services max
		if (chosenServices.length >= 3) {
			alert("Vous ne pouvez sélectionner que 3 services."); // FIXME: toast ?
			return;
		}

		setChosenServices((prev) => [...prev, selectedService]);
	};

	const handleAddService = () => {
		console.log("chaussette");
	};

	const handleRemoveService = (serviceId: string) => {
		setChosenServices((prev) =>
			prev.filter((service) => service.id !== serviceId),
		);
	};

	return (
		<div className="serviceModal">
			<div className="serviceModal__content">
				<h2>Choisissez ou ajoutez une étiquette</h2>

				<label className="serviceModal__content--list">
					Ajoutez une étiquette existante :
					<select onChange={handleSelectService}>
						<option value="">Sélectionnez un service</option>
						{data.getAllServices.map((service: ServiceType) => (
							<option key={service.id} value={service.id}>
								{service.smiley} {service.title}
							</option>
						))}
					</select>
				</label>

				<hr />

				{/* création d'un service */}
				<label className="serviceModal__content--list">
					Créez votre propre étiquette :
				</label>
				<p>Aperçu</p>
				{/* Service */}
				<div className="serviceModal__content--newSmileyAndTitle">
					<div>smiley</div>
					<div>title</div>
				</div>

				<hr />

				{/* aperçu des services (3max) */}
				<p className="serviceModal__content--text">
					Vous pouvez choisir jusqu'à 3 étiquettes pour votre évènement.
				</p>
				<p className="serviceModal__content--text">
					Cliquez sur une étiquette pour la supprimer de la liste.
				</p>
				<div className="serviceModal__content--chosen">
					{chosenServices.map((service: ServiceType) => (
						<Service
							key={service.id}
							service={service}
							onClick={() => handleRemoveService(service.id)}
						/>
					))}
				</div>

				<span className="serviceModal__buttons">
					<Button style="btn-dark" type="button" onClick={onClose}>
						Fermer
					</Button>
					<Button style="submit" type="submit" onClick={handleAddService}>
						Ajouter
					</Button>
				</span>
			</div>
		</div>
	);
}

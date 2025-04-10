import { useState } from "react";
import Modal from "./_molecules/Modal/Modal";
import Button from "./_atoms/Button/Button";

function TestModal() {
	const [showModal, setShowModal] = useState(false);
	const [selectedService, setSelectedService] = useState("");

	const serviceOptions = ["a", "b", "c", "d", "e"];

	const handleServiceSelection = (value: string) => {
		setSelectedService(value);
	};

	return (
		<>
			<Button style="btn-dark" onClick={() => setShowModal(true)}>
				Ouvrir Modal
			</Button>

			<Modal
				type="info"
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				selectMenu={serviceOptions}
				onSelectChange={handleServiceSelection}
			>
				<p>Veuillez sélectionner un service avant de confirmer</p>
				<Button
					style="btn-dark"
					onClick={() => {
						if (selectedService) {
							setShowModal(false);
						} else {
							alert("Veuillez sélectionner un service");
						}
					}}
				>
					Confirmer
				</Button>
			</Modal>
		</>
	);
}

export default TestModal;

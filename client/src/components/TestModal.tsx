import { useState } from "react";
import Modal from "./_molecules/Modal/Modal";
import Button from "./_atoms/Button/Button";

function TestModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button style="btn-dark" onClick={() => setShowModal(true)}>
				Ouvrir Modal
			</Button>

			<Modal
				type="warning"
				isOpen={showModal}
				onClose={() => setShowModal(false)}
			>
				<p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
				<Button
					style="btn-dark"
					onClick={() => {
						setShowModal(false);
					}}
				>
					Supprimer l’événement
				</Button>
			</Modal>
		</>
	);
}

export default TestModal;

import Button from "@/components/_atoms/Button/Button";
import Modal from "@/components/_molecules/Modal/Modal";

import ImgModalWarning from "@/assets/illustrations/chien-ville-point-exclamation.png";
import ImgModalSuccess from "@/assets/illustrations/chien-porte-welcome.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface EventFormActionsProps {
	isCreate: boolean;
}

export default function EventFormActions({ isCreate }: EventFormActionsProps) {
	const navigate = useNavigate();
	const [showCancelModal, setShowCancelModal] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);

	const handleConfirmCreate = async () => {
		setShowCreateModal(false);
	};

	const handleConfirmCancel = () => {
		setShowCancelModal(false);
		navigate(-1);
	};

	return (
		<>
			<span className="createEvent__event createEvent__event--buttons">
				<Button
					type="button"
					style="btn-cancel"
					onClick={() => setShowCancelModal(true)}
				>
					{isCreate ? "Annuler" : "Annuler les modifications"}
				</Button>
				<Button
					type="button"
					style="btn-dark"
					onClick={() => setShowCreateModal(true)}
				>
					{isCreate ? "Créer l'évènement" : "Mettre à jour l'évènement"}
				</Button>
			</span>

			<Modal
				type="warning"
				isOpen={showCancelModal}
				onClose={() => setShowCancelModal(false)}
				customImage={ImgModalWarning}
			>
				<p>
					{isCreate
						? "Êtes-vous sûr de vouloir annuler la création de cet évènement ?"
						: "Êtes-vous sûr de vouloir annuler les modifications de cet évènement ?"}
				</p>
				<Button
					style="button"
					className="modal__btn--cancelOrange"
					onClick={() => setShowCancelModal(false)}
				>
					{isCreate ? "Continuer à créer" : "Continuer les modifications"}
				</Button>
				<Button style="btn-dark" onClick={handleConfirmCancel}>
					{isCreate ? "Annuler la création" : "Annuler les modifications"}
				</Button>
			</Modal>

			<Modal
				type="success"
				isOpen={showCreateModal}
				onClose={() => setShowCreateModal(false)}
				customImage={ImgModalSuccess}
			>
				<p>
					{isCreate
						? "Confirmez-vous la création de cet évènement ?"
						: "Confirmez-vous la mise à jour de cet évènement ?"}
				</p>
				<Button
					style="button"
					className="modal__btn--cancelGreen"
					onClick={() => setShowCreateModal(false)}
				>
					{isCreate ? "Continuer à créer" : "Continuer les modifications"}
				</Button>
				<Button type="submit" style="btn-dark" onClick={handleConfirmCreate}>
					{isCreate ? "Confirmer la création" : "Confirmer la mise à jour"}
				</Button>
			</Modal>
		</>
	);
}

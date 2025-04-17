import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { toast } from "react-toastify";
import { DELETE_EVENT_BY_ID } from "@/graphQL/mutations/event";

import Button from "@/components/_atoms/Button/Button";
import Modal from "@/components/_molecules/Modal/Modal";

import ImgModal from "@/assets/illustrations/chien-ville-point-exclamation.png";

function EventTrainerActions() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [deleteEventById] = useMutation(DELETE_EVENT_BY_ID, {
		onCompleted: () => {
			toast.info("L'événement a été supprimé avec succès !");
			navigate("/trainer/planning");
		},
		onError: (err) => {
			toast.error(`Erreur lors de la suppression : ${err.message}`);
		},
	});

	const handleDeleteClick = async () => {
		setShowDeleteModal(true);
	};

	const handleEditClick = () => {
		navigate(`/trainer/planning/events/${id}/edit`);
	};

	const handleConfirmDelete = async () => {
		await deleteEventById({ variables: { eventId: Number(id) } });
		setShowDeleteModal(false);
	};

	return (
		<>
			<span className="createEvent__event createEvent__event--buttons">
				<Button type="button" style="btn-cancel" onClick={handleDeleteClick}>
					Supprimer l'événement
				</Button>
				<Button type="button" style="btn-dark" onClick={handleEditClick}>
					Modifier l'événement
				</Button>
			</span>
			<Modal
				type="warning"
				isOpen={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				customImage={ImgModal}
			>
				<p> Êtes-vous sûr de vouloir supprimer cet événement ?</p>
				<Button
					style="button"
					className="modal__btn--cancelOrange"
					onClick={() => setShowDeleteModal(false)}
				>
					Annuler
				</Button>
				<Button
					style="button"
					className="modal__btn--confirm"
					onClick={handleConfirmDelete}
				>
					Supprimer l'événement
				</Button>
			</Modal>
		</>
	);
}

export default EventTrainerActions;

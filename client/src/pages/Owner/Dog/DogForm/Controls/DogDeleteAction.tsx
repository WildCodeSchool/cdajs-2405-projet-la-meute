import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { DELETE_DOG } from "@/graphQL/mutations/dog";

import Button from "@/components/_atoms/Button/Button";
import Modal from "@/components/_molecules/Modal/Modal";
import ImgModal from "@/assets/illustrations/chien-ville-point-exclamation.png";

import { toast } from "react-toastify";

type DogDeleteActionProps = {
	ownerId: number;
	dogId: number;
	dogName: string | undefined;
};

function DogDeleteAction({ ownerId, dogId, dogName }: DogDeleteActionProps) {
	const [deleteModal, setDeleteModal] = useState(false);
	const navigate = useNavigate();
	const [dogDelete] = useMutation(DELETE_DOG);

	const confirmDelete = async () => {
		try {
			await dogDelete({
				variables: {
					dogId: dogId,
					ownerId: ownerId,
				},
			});
			toast.info("Le profil de votre chien a été supprimé avec succès.");
			navigate("/owner/my-dogs");
		} catch (error) {
			console.error("Error saving dog:", error);
			toast.error("Une erreur inattendue s'est produite.");
		}
		setDeleteModal(false);
	};

	const cancelDelete = () => {
		setDeleteModal(false);
	};

	return (
		<>
			<Button
				type="button"
				style={{ type: "thin-btn-light", color: "red" }}
				onClick={() => setDeleteModal(true)}
			>
				Suppression du profil
			</Button>
			<Modal
				type="warning"
				isOpen={deleteModal}
				onClose={cancelDelete}
				customImage={ImgModal}
			>
				<p>
					Êtes-vous sûr de vouloir supprimer le profil de votre chien {dogName}?
				</p>
				<Button
					style="button"
					className="modal__btn--cancelOrange"
					onClick={cancelDelete}
				>
					Annuler
				</Button>
				<Button onClick={confirmDelete} style="btn-dark">
					Confirmer
				</Button>
			</Modal>
		</>
	);
}

export default DogDeleteAction;

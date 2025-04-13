import FileInput from "@/components/_atoms/Inputs/FileInputs/FileInput";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import type { ProfileFormValues } from "../Profile";
import Button from "@/components/_atoms/Button/Button";
import Modal from "@/components/_molecules/Modal/Modal";
import { useEffect, useState } from "react";

interface FormType {
	values: ProfileFormValues;
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
}

interface ProfileViewProps {
	form: FormType;
	isTrainer: boolean;
	setPreviewUrl: (url: string | null) => void;
	selectedFile: File | null;
	setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

function ProfileView({
	form,
	isTrainer,
	setPreviewUrl,
	selectedFile,
	setSelectedFile,
}: ProfileViewProps) {
	const [confirmModal, setConfirmModal] = useState(false);
	const [tempFile, setTempFile] = useState<File | null>(null);

	useEffect(() => {
		if (selectedFile) {
			const objectUrl = URL.createObjectURL(selectedFile);
			setPreviewUrl(objectUrl);
			return () => URL.revokeObjectURL(objectUrl);
		}
		setPreviewUrl(null);
	}, [selectedFile, setPreviewUrl]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setTempFile(file);
			setConfirmModal(true);
		} else {
			setTempFile(null);
		}
	};

	const confirmFileSelection = () => {
		setSelectedFile(tempFile);
		setConfirmModal(false);
	};

	const cancelFileSelection = () => {
		setTempFile(null);
		setConfirmModal(false);
		const fileInput = document.querySelector(
			'input[type="file"]',
		) as HTMLInputElement;
		if (fileInput) {
			fileInput.value = "";
		}
	};

	return (
		<>
			<FileInput
				label="Photo de profil"
				accept="image/*"
				onChange={handleFileChange}
			/>
			<span className="profile__form--names">
				<TextInput
					style="light"
					type="firstname"
					name="firstname"
					value={form.values.firstname}
					onChange={form.handleChange}
				/>
				<TextInput
					style="light"
					type="lastname"
					name="lastname"
					value={form.values.lastname}
					onChange={form.handleChange}
				/>
			</span>
			<TextInput
				style="light"
				type="city"
				name="city"
				value={form.values.city}
				onChange={form.handleChange}
			/>
			{isTrainer && (
				<p>
					Indiquez une adresse générale pour donner un périmètre à vos clients.
				</p>
			)}
			<TextInput
				style="light"
				type="description"
				inputType="textarea"
				name="description"
				value={form.values.description}
				onChange={form.handleChange}
			/>
			<Modal
				type="info"
				isOpen={confirmModal}
				onClose={cancelFileSelection}
				filePreview={tempFile}
			>
				<p>Voulez-vous utiliser cette image comme avatar ?</p>
				<Button
					style="button"
					className="modal__btn--cancelBlue"
					onClick={cancelFileSelection}
				>
					Annuler
				</Button>
				<Button onClick={confirmFileSelection} style="btn-light">
					Confirmer
				</Button>
			</Modal>
		</>
	);
}

export default ProfileView;

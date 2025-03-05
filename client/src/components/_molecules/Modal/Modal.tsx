import "./Modal.scss";
import Button from "@/components/_atoms/Button/Button";
import React, { useRef, useEffect, useState } from "react";
import logo from "@/assets/logo/beige/symbol/logo-pawplanner-symbol-beige.svg";

type ModalProps = {
	variant?: "confirm";
	type: "success" | "info" | "warning";
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	filePreview?: File | null;
};

export default function Modal({
	variant = "confirm",
	type = "info",
	children,
	isOpen,
	onClose,
	filePreview = null,
}: ModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const icons = {
		success: logo,
		info: logo,
		warning: logo,
	};

	const promptMessage = React.Children.toArray(children).filter(
		(child) => React.isValidElement(child) && child.type === "p",
	);

	const action = React.Children.toArray(children).filter(
		(child) => React.isValidElement(child) && child.type === Button,
	);

	if (promptMessage.length === 0 || action.length === 0) {
		throw new Error(
			"Modal requires both a paragraph (<p>) and a Button component as children",
		);
	}

	useEffect(() => {
		const dialog = dialogRef.current;

		if (!dialog) return;

		isOpen ? dialog.showModal() : dialog.close();
	}, [isOpen]);

	useEffect(() => {
		if (filePreview) {
			const url = URL.createObjectURL(filePreview);
			setPreviewUrl(url);

			return () => {
				URL.revokeObjectURL(url);
			};
		}
		setPreviewUrl(null);
	}, [filePreview]);

	const backdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		if (
			e.clientY < rect.top ||
			e.clientY > rect.bottom ||
			e.clientX < rect.left ||
			e.clientX > rect.right
		)
			onClose();
	};

	return (
		<dialog
			ref={dialogRef}
			className={`modal modal--${type} modal--${variant}`}
			onClick={backdropClick}
			onKeyDown={() => ""}
		>
			<img
				src={previewUrl ? previewUrl : icons[type]}
				alt={previewUrl ? "selected file" : `${type} icon`}
				className="modal__picture"
			/>

			<div className="modal__prompt">{promptMessage}</div>

			<div className="modal__actions">
				<button
					type="button"
					className="modal__actions--cancel"
					onClick={onClose}
				>
					Annuler
				</button>
				{action}
			</div>
		</dialog>
	);
}

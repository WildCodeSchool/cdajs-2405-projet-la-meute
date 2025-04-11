import {
	useState,
	useRef,
	useEffect,
	type Dispatch,
	type SetStateAction,
} from "react";
import "./ServiceModal.scss";
import Button from "@/components/_atoms/Button/Button";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_SERVICES } from "@/graphQL/queries/service";
import { CREATE_SERVICE } from "@/graphQL/mutations/service";
import type { ServiceType } from "@/types/Service";
import Service from "@/components/_atoms/Service/Service";
import EmojiPicker, { Theme } from "emoji-picker-react";

export default function ServiceModal({
	services,
	setServices,
	onClose,
	isOpen,
}: {
	services: ServiceType[];
	setServices: Dispatch<SetStateAction<ServiceType[]>>;
	onClose: () => void;
	isOpen: boolean;
}) {
	const defaultService = {
		title: "",
		smiley: "😊",
		color: "#E37D7D",
	};
	const [chosenServices, setChosenServices] = useState<ServiceType[]>([]);
	const [newServiceTitle, setNewServiceTitle] = useState(defaultService.title);
	const [newServiceSmiley, setNewServiceSmiley] = useState(
		defaultService.smiley,
	);
	const [newServiceColor, setNewServiceColor] = useState(defaultService.color);
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	const emojiPickerRef = useRef<HTMLDivElement>(null);
	const dialogRef = useRef<HTMLDialogElement>(null);

	const { data, loading, error, refetch } = useQuery(GET_ALL_SERVICES);
	const [createService] = useMutation(CREATE_SERVICE);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			dialog.showModal();
			dialogRef.current?.focus();
		} else {
			dialog.close();
		}
	}, [isOpen]);

	const colorOptions = [
		"#7DADEB",
		"#76C6C5",
		"#76C39E",
		"#B2C98F",
		"#E2C478",
		"#E09A6C",
		"#E37D7D",
		"#C48FCB",
		"#9E9CCF",
	];

	useEffect(() => {
		services ? setChosenServices(services) : setChosenServices([]);
	}, [services]);

	const handleSelectService = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedService = data.getAllServices.find(
			(serv: ServiceType) => serv.id === e.target.value,
		);
		if (!selectedService) return;

		if (chosenServices.some((serv) => serv.id === selectedService.id)) {
			alert("Cette étiquette est déjà sélectionnée.");
		} else if (chosenServices.length >= 3) {
			alert("Vous ne pouvez sélectionner que 3 étiquettes.");
		} else {
			setChosenServices((prev) => [...prev, selectedService]);
		}

		e.target.value = "";
	};

	const handleRemoveService = (serviceId: string) => {
		setChosenServices((prev) =>
			prev.filter((service) => service.id !== serviceId),
		);
	};

	const handleCreateService = async () => {
		if (!newServiceTitle.trim()) {
			alert("Veuillez entrer un nom pour l'étiquette.");
			return;
		}
		if (
			data.getAllServices.some(
				(service: ServiceType) => service.title === newServiceTitle,
			)
		) {
			alert("Il y a déjà une étiquette avec ce titre.");
			return;
		}
		if (chosenServices.length >= 3) {
			alert("Vous ne pouvez pas ajouter plus de 3 étiquettes.");
			return;
		}

		try {
			const { data } = await createService({
				variables: {
					title: newServiceTitle,
					smiley: newServiceSmiley,
					color: newServiceColor,
				},
			});

			if (data?.createService) {
				setChosenServices((prev) => [...prev, data.createService]);
				setNewServiceTitle(defaultService.title);
				setNewServiceSmiley(defaultService.smiley);
				setNewServiceColor(defaultService.color);
				refetch();
			}
		} catch (error) {
			console.error("Erreur lors de la création de l'étiquette :", error);
		}
	};

	const handleEmojiClick = (emoji: { emoji: string }) => {
		setNewServiceSmiley(emoji.emoji);
		setShowEmojiPicker(false);
	};

	const handleValidate = () => {
		setServices(chosenServices);
		onClose();
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape" && isOpen) {
			onClose();
		}
	};

	const backdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (e.target === dialogRef.current) {
			e.preventDefault();
			onClose();
		}
	};

	if (loading) return <p>Chargement des étiquettes...</p>;
	if (error) return <p>Erreur : {error.message}</p>;
	if (!data || !data.getAllServices) return <p>Aucune étiquette disponible.</p>;

	return (
		<dialog
			className="serviceModal"
			ref={dialogRef}
			onClick={backdropClick}
			onCancel={onClose}
			onKeyDown={handleKeyDown}
		>
			<div className="serviceModal__content">
				{/* Pick an existing service */}
				<label htmlFor="services" className="serviceModal__content--title">
					Ajoutez une étiquette existante :
				</label>
				<select
					id="services"
					name="services"
					className="serviceModal__content--select"
					onChange={handleSelectService}
				>
					<option value="">Sélectionnez une étiquette existante</option>
					{data.getAllServices.map((service: ServiceType) => (
						<option key={service.id} value={service.id}>
							{service.smiley} {service.title}
						</option>
					))}
				</select>

				<hr />

				{/* New service */}
				<span className="serviceModal__newService">
					<h3 className="serviceModal__content--title">
						Ou créez votre propre étiquette :
					</h3>
					<p className="serviceModal__content--text">
						Cliquez sur un élément pour le modifier.
					</p>
					<span
						className="serviceModal__newService--Service"
						style={{ backgroundColor: newServiceColor }}
					>
						<p
							className="serviceModal__newService--smiley"
							onClick={() => setShowEmojiPicker((prev) => !prev)}
							onKeyUp={() => setShowEmojiPicker((prev) => !prev)}
						>
							{newServiceSmiley}
						</p>{" "}
						<input
							type="text"
							className="serviceModal__newService--input"
							placeholder="Nom du service"
							value={newServiceTitle}
							onChange={(e) => setNewServiceTitle(e.target.value)}
						/>
					</span>

					{showEmojiPicker && (
						<div ref={emojiPickerRef} className="emojiPickerContainer">
							<EmojiPicker
								theme={Theme.DARK}
								className="emojiPicker"
								onEmojiClick={handleEmojiClick}
							/>
						</div>
					)}

					<div className="serviceModal__content--colorOptions">
						{colorOptions.map((color) => (
							<span
								key={color}
								className="serviceModal__content--colorOption"
								style={{
									backgroundColor: color,
									border: newServiceColor === color ? "2px solid black" : "",
								}}
								onClick={() => setNewServiceColor(color)}
								onKeyUp={() => setNewServiceColor(color)}
							/>
						))}
					</div>

					<Button
						style="none"
						className="serviceModal__newService--button"
						type="button"
						onClick={handleCreateService}
					>
						{"Créer"}
					</Button>
				</span>

				<hr />

				{/* Chosen services preview */}
				<span className="serviceModal__chosenServices">
					<p className="serviceModal__content--text">
						Vous pouvez choisir jusqu'à 3 étiquettes.
					</p>
					<p className="serviceModal__content--text">
						Cliquez sur une étiquette pour la supprimer.
					</p>
					<div className="serviceModal__chosenServices--list">
						{chosenServices.map((service: ServiceType) => (
							<Service
								key={service.id}
								service={service}
								onClick={() => handleRemoveService(service.id)}
							/>
						))}
					</div>
				</span>

				<span className="serviceModal__buttons">
					<Button
						className="serviceModal__buttons--close"
						style="none"
						type="button"
						onClick={onClose}
					>
						Fermer
					</Button>
					<Button style="btn-light" type="submit" onClick={handleValidate}>
						Valider
					</Button>
				</span>
			</div>
		</dialog>
	);
}

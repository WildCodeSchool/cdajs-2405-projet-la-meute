import ServiceModal from "@/components/_molecules/ServiceModal/ServiceModal";
import "./Service.scss";

import { type Dispatch, type SetStateAction, useState } from "react";
import Button from "../Button/Button";
import type { ServiceType } from "@/types/Service";

export default function NewService({
	services,
	setServices,
}: {
	services: ServiceType[];
	setServices: Dispatch<SetStateAction<ServiceType[]>>;
}) {
	const [showModal, setShowModal] = useState(false);

	const children =
		services.length <= 0
			? "+ Ajouter une étiquette"
			: "Modifier les étiquettes";

	return (
		<>
			<Button
				style="none"
				onClick={() => setShowModal(true)}
				className="newService"
			>
				{children}
			</Button>

			{showModal && (
				<ServiceModal
					services={services}
					setServices={setServices}
					onClose={() => setShowModal(false)}
					isOpen={showModal}
				/>
			)}
		</>
	);
}

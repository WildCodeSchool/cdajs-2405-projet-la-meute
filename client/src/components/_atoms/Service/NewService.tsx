import ServiceModal from "@/components/_molecules/ServiceModal/ServiceModal";
import "./Service.scss";

import { useState } from "react";
import Button from "../Button/Button";

export default function NewService() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button
				style="none"
				onClick={() => setShowModal(true)}
				className="newService"
			>
				+ Nouvelle étiquette
			</Button>

			{showModal && <ServiceModal onClose={() => setShowModal(false)} />}
		</>
	);
}

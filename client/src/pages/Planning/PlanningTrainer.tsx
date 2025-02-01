import "@/pages/Planning/PlanningTrainer.scss";

import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader.tsx";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import frLocale from "@fullcalendar/core/locales/fr";
import interactionPlugin from "@fullcalendar/interaction";

function PlanningTrainer() {
	const [currentView] = useState("dayGridMonth");
	const [isMobile, setIsMobile] = useState(false);

	// Fonction pour vérifier si l'écran est en mode mobile
	const checkIsMobile = () => {
		setIsMobile(window.innerWidth < 850); // valeur en px de $mobile
	};

	useEffect(() => {
		// Vérification initiale
		checkIsMobile();

		// Ajouter l'écouteur d'événement
		window.addEventListener("resize", checkIsMobile);

		// Nettoyer l'écouteur lors du démontage du composant
		return () => {
			window.removeEventListener("resize", checkIsMobile);
		};
	}, []);

	const desktopToolbar = {
		left: "today prev,next title",
		right: "listWeek,timeGridWeek,dayGridMonth",
	};

	const mobileToolbar = {
		left: "listWeek",
		center: "today,dayGridMonth",
		right: "prev title next",
	};

	return (
		<>
			<PlanningHeader title="Planning" />
			<div className="calendar-container">
				<FullCalendar
					plugins={[
						dayGridPlugin,
						timeGridPlugin,
						listPlugin,
						interactionPlugin,
					]}
					initialView={currentView}
					headerToolbar={isMobile ? mobileToolbar : desktopToolbar}
					locale={frLocale}
					height="auto"
					views={{
						dayGridMonth: { buttonText: "Mois" },
						timeGridWeek: { buttonText: "Semaine" },
						listWeek: { buttonText: "Liste des événements" },
					}}
					buttonText={{
						today: "Aujourd'hui",
					}}
				/>
			</div>
		</>
	);
}

export default PlanningTrainer;

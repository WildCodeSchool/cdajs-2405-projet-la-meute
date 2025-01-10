import "@/pages/Planning/PlanningTrainer.scss";

import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader.tsx";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import frLocale from "@fullcalendar/core/locales/fr";
import interactionPlugin from "@fullcalendar/interaction";

function PlanningTrainer() {
	const [currentView] = useState("dayGridMonth");

	const headerToolbar = {
		left: "today prev,next title",
		right: "listWeek,timeGridWeek,dayGridMonth",
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
					headerToolbar={headerToolbar}
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

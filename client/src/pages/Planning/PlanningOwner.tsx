import "@/pages/Planning/Planning.scss";

import { useIsMobile } from "@/hooks/checkIsMobile";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import frLocale from "@fullcalendar/core/locales/fr";
import interactionPlugin from "@fullcalendar/interaction";

function PlanningOwner() {
	const [currentView] = useState("dayGridMonth");

	const isMobile = useIsMobile();

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

export default PlanningOwner;

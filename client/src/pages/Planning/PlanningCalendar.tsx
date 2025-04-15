import { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import frLocale from "@fullcalendar/core/locales/fr";
import interactionPlugin from "@fullcalendar/interaction";
import { useIsMobile } from "@/hooks/checkIsMobile";

import type { EventContentArg, EventInput } from "@fullcalendar/core";

interface PlanningCalendarProps {
	events: EventInput[];
	currentView: string;
	onViewChange: (view: string) => void;
	onEventClick: (eventId: string) => void;
	eventContent: (arg: EventContentArg) => JSX.Element | null;
}

function PlanningCalendar({
	events,
	currentView,
	onViewChange,
	onEventClick,
	eventContent,
}: PlanningCalendarProps) {
	// Check size to select the right toolbar in function of the viewport
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

	const calendarViews = {
		dayGridMonth: { buttonText: "Mois" },
		timeGridWeek: {
			buttonText: "Semaine",
			slotMinTime: "06:00:00",
			slotMaxTime: "21:00:00",
			slotDuration: "00:30:00",
		},
		listWeek: { buttonText: "Liste des événements" },
	};

	// Hide row all day on timeGridWeek
	useEffect(() => {
		const calendarContainer = document.querySelector(".calendar-container");

		if (calendarContainer) {
			if (currentView === "timeGridWeek") {
				calendarContainer.classList.add("hide-daygrid-body");
			} else {
				calendarContainer.classList.remove("hide-daygrid-body");
			}
		}
	}, [currentView]);

	return (
		<div className="calendar-container">
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
				initialView={currentView}
				headerToolbar={isMobile ? mobileToolbar : desktopToolbar}
				locale={frLocale}
				timeZone="Europe/Paris"
				height="auto"
				events={events}
				views={calendarViews}
				buttonText={{
					today: "Aujourd'hui",
				}}
				datesSet={(arg) => onViewChange(arg.view.type)}
				eventContent={eventContent}
				eventClick={(clickInfo) => {
					onEventClick(clickInfo.event.id);
				}}
			/>
		</div>
	);
}

export default PlanningCalendar;

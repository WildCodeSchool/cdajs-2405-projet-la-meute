import "@/pages/Planning/Planning.scss";

import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader.tsx";

import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { useIsMobile } from "@/hooks/checkIsMobile";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_EVENTS } from "@/graphQL/queries/event";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import frLocale from "@fullcalendar/core/locales/fr";
import interactionPlugin from "@fullcalendar/interaction";

interface Event {
	id: number;
	date: string;
	title: string;
	description: string;
	group_max_size: number;
	location: Location;
}

interface Location {
	latitude: number;
	longitude: number;
}

interface GetAllEventsData {
	getAllEvents: Event[];
}

function Planning() {
	/* Business logic */

	const navigate = useNavigate();
	const { user } = useUser();
	const { data } = useQuery<GetAllEventsData>(GET_ALL_EVENTS);

	const events =
		data?.getAllEvents.map((event: Event) => ({
			id: event.id,
			title: event.title,
			start: new Date(event.date),
			description: event.description,
			extendedProps: {
				group_max_size: event.group_max_size,
				location: event.location,
			},
		})) || [];

	/* FullCalendar views */

	const [currentView, setCurrentView] = useState("dayGridMonth");

	// Allow to generate differents titles in function of view for PlanningHeader
	const getPlanningHeaderProps = () => {
		switch (currentView) {
			case "dayGridMonth":
				return {
					title: "Planning Mensuel",
				};

			case "timeGridWeek":
				return {
					title: "Planning Hebdomadaire",
				};

			case "listWeek":
				return {
					title: "Liste des Événements",
				};

			default:
				return {
					title: "Planning",
				};
		}
	};

	// Initialize the props to change for PlanningHeader
	const { title } = getPlanningHeaderProps();

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
			{user?.role === "trainer" && <PlanningHeader title={title} />}
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
					events={events}
					views={{
						dayGridMonth: { buttonText: "Mois" },
						timeGridWeek: { buttonText: "Semaine" },
						listWeek: { buttonText: "Liste des événements" },
					}}
					buttonText={{
						today: "Aujourd'hui",
					}}
					datesSet={(arg) => {
						setCurrentView(arg.view.type);
					}}
					eventContent={(arg) => {
						// View Month
						if (currentView === "dayGridMonth") {
							return (
								<div className="event-content-month">
									<div className="event-title">{arg.event.title}</div>
								</div>
							);
						}
						// View Week
						if (currentView === "timeGridWeek") {
							return (
								<div className="event-content-week">
									<div className="event-title">{arg.event.title}</div>
									<div className="event-description">
										{arg.event.extendedProps.description}
									</div>
								</div>
							);
						}
						// View list of Events
						if (currentView === "listWeek") {
							return (
								<div className="event-content-list">
									<div className="event-title">{arg.event.title}</div>
									<div className="event-description">
										{arg.event.extendedProps.description}
									</div>
									<div className="event-details">
										<div>
											Taille max. du groupe :{" "}
											{arg.event.extendedProps.group_max_size}
										</div>
										<div className="event-location">
											Coordonnées : {arg.event.extendedProps.location.latitude},
											{arg.event.extendedProps.location.longitude}
										</div>
									</div>
								</div>
							);
						}
					}}
					// Navigate to event details where we can update or delete the event
					eventClick={(clickInfo) => {
						// Get event id to use it in the path
						const eventId = clickInfo.event.id;
						const userRole = user?.role;
						// Navigate to the event in function of the role
						if (userRole === "trainer") {
							navigate(`/trainer/planning/my-events/${eventId}`);
						} else if (userRole === "owner") {
							navigate(`/owner/planning/${eventId}`);
						} else {
							// If unauthorized user try to force the URL
							console.error("Vous n'êtes pas autorisé à voir cet événement");
						}
					}}
				/>
			</div>
		</>
	);
}

export default Planning;

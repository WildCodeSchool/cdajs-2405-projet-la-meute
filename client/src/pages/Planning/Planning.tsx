import "@/pages/Planning/Planning.scss";

import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader.tsx";

import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useState } from "react";
import { useIsMobile } from "@/hooks/checkIsMobile";
import PlanningCalendar from "./PlanningCalendar";

// Interfaces
import type { Event } from "@/types/Event";
import type { EventContentArg } from "@fullcalendar/core/index.js";
import PlanningEventsListView from "./PlanningEventListView";
import LoadingIndicator from "@/components/_atoms/LoadingIndicator/LoadingIndicator";

function Planning() {
	/* Business logic */

	const navigate = useNavigate();
	const isMobile = useIsMobile();

	const { events, role } = useLoaderData() as {
		events: Event[];
		role: "trainer" | "owner";
	};

	// Check if the role is trainer or owner
	const isTrainer = role === "trainer";

	const formatEvents = (eventsToFormat: Event[]) => {
		return eventsToFormat.map((event) => ({
			id: event.id.toString(),
			title: event.title,
			start: new Date(event.startDate),
			end: new Date(event.endDate),
			description: event.description,
			extendedProps: {
				group_max_size: event.group_max_size,
				location: event.location,
				price: event.price,
				dogs: event.participation?.map((p) => p.dog) || [],
				services: event.services || [],
			},
		}));
	};

	const handleEventClick = (eventId: string) => {
		navigate(`/event/${eventId}`);
	};

	/* FullCalendar views */

	const [currentView, setCurrentView] = useState("dayGridMonth");

	// Allow to generate differents titles in function of view for PlanningHeader
	const viewTitles = {
		dayGridMonth: "Planning Mensuel",
		timeGridWeek: "Planning Hebdomadaire",
		listWeek: "Liste des Événements",
	};

	const getPlanningTitle = (view: string) => {
		return viewTitles[view as keyof typeof viewTitles] || "Planning";
	};

	// Initialize the props to change for PlanningHeader
	const title = getPlanningTitle(currentView);

	const viewRender = (arg: EventContentArg) => {
		// Checking if start or end is null
		if (arg.event.start === null || arg.event.end === null) {
			return <p>"Aucune date trouvée pour cet événement"</p>;
		}

		// View Month
		if (currentView === "dayGridMonth") {
			if (isMobile) {
				return <div className="event-dot" />;
			}

			return (
				<div className="event-dayGridMonth">
					<div className="event-title">{arg.event.title}</div>
				</div>
			);
		}

		// View Week
		if (currentView === "timeGridWeek") {
			return (
				<div className="event-timeGridWeek">
					<div className="event-title">{arg.event.title}</div>
				</div>
			);
		}

		// View listWeek
		if (currentView === "listWeek") {
			return <PlanningEventsListView arg={arg} />;
		}

		return null;
	};

	return (
		<>
			<PlanningHeader
				title={title}
				buttonLabel="event"
				href={isTrainer ? "/trainer/planning/event/new" : undefined}
			/>
			<Suspense fallback={<LoadingIndicator />}>
				<Await
					resolve={events}
					errorElement={
						<div className="error-message">
							Erreur lors du chargement des événements
						</div>
					}
				>
					{(events) => (
						<PlanningCalendar
							events={formatEvents(events)}
							currentView={currentView}
							onViewChange={setCurrentView}
							onEventClick={handleEventClick}
							eventContent={viewRender}
						/>
					)}
				</Await>
			</Suspense>
		</>
	);
}

export default Planning;

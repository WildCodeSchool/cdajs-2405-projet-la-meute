import "@/pages/Planning/Planning.scss";

import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader.tsx";

import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useIsMobile } from "@/hooks/checkIsMobile";
import {
	GET_ALL_EVENTS_BY_TRAINER_ID,
	GET_ALL_EVENTS_BY_OWNER_ID,
} from "@/graphQL/queries/event";
import PlanningCalendar from "./PlanningCalendar";

// Interfaces
import type {
	Event,
	GetAllEventsByTrainerId,
	GetAllEventsByOwnerId,
} from "@/types/Event";
import type { EventContentArg } from "@fullcalendar/core/index.js";
import PlanningEventsListView from "./PlanningEventListView";

function Planning() {
	/* Business logic */

	const navigate = useNavigate();
	const isMobile = useIsMobile();
	const { user, role } = useUser();
	const { data: trainerEventsData } = useQuery<GetAllEventsByTrainerId>(
		GET_ALL_EVENTS_BY_TRAINER_ID,
		{
			variables: {
				trainerId: user?.id ? Number(user.id) : null,
			},
			fetchPolicy: "no-cache",
		},
	);
	const { data: ownerEventsData } = useQuery<GetAllEventsByOwnerId>(
		GET_ALL_EVENTS_BY_OWNER_ID,
		{
			variables: {
				ownerId: user?.id ? Number(user.id) : null,
			},
			fetchPolicy: "no-cache",
		},
	);

	// Check if the role is trainer or owner
	const isTrainer = role === "trainer";

	// Events associates to specific trainer
	const trainerEvents =
		trainerEventsData?.getAllEventsByTrainerId.map((event: Event) => ({
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
		})) || [];

	// Events associates to specific owner
	const ownerEvents =
		ownerEventsData?.getAllEventsByOwnerId.map((event: Event) => ({
			id: event.id.toString(),
			title: event.title,
			start: new Date(event.startDate),
			end: new Date(event.endDate),
			description: event.description,
			extendedProps: {
				group_max_size: event.group_max_size,
				location: event.location,
				price: event.price,
				services: event.services || [],
			},
		})) || [];

	const handleEventClick = (eventId: string) => {
		navigate(`/event/${eventId}`); // TODO: change to /event/${eventId} when merging routes refactor
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
				href="/trainer/planning/events/new"
			/>
			<PlanningCalendar
				events={isTrainer ? trainerEvents : ownerEvents}
				currentView={currentView}
				onViewChange={setCurrentView}
				onEventClick={handleEventClick}
				eventContent={viewRender}
			/>
		</>
	);
}

export default Planning;

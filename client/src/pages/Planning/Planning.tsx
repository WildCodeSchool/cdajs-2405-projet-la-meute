import "@/pages/Planning/Planning.scss";

import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader.tsx";
import DogBubbles from "@/components/_molecules/DogsBubbles/DogsBubbles";

import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { useIsMobile } from "@/hooks/checkIsMobile";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
	GET_ALL_EVENTS,
	GET_ALL_EVENTS_BY_OWNER_ID,
} from "@/graphQL/queries/event";
import Service from "@/components/_atoms/Service/Service";
import type { ServiceType } from "@/types/Service";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import frLocale from "@fullcalendar/core/locales/fr";
import interactionPlugin from "@fullcalendar/interaction";

// Icons
import { CalendarWithClock } from "@/assets/icons/calendar-with-clock";
import { MapPin } from "@/assets/icons/map-pin";

// Interfaces
import type {
	Event,
	GetAllEventsData,
	GetAllEventsByOwnerId,
} from "@/types/Event";

function Planning() {
	/* Business logic */

	const navigate = useNavigate();
	const { user, role } = useUser();
	const { data: allEventsData } = useQuery<GetAllEventsData>(GET_ALL_EVENTS, {
		fetchPolicy: "no-cache",
	});
	const { data: ownerEventsData } = useQuery<GetAllEventsByOwnerId>(
		GET_ALL_EVENTS_BY_OWNER_ID,
		{
			variables: {
				ownerId: user?.id ? Number(user.id) : null,
			},
		},
	);

	// Check if the role is trainer or owner
	const isTrainer = role === "trainer";

	// All events
	const events =
		allEventsData?.getAllEvents.map((event: Event) => ({
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
			},
		})) || [];

	// Navigate to dog's profile when you click on bubble image
	interface Dog {
		id: number;
		name: string;
	}

	const handleDogClick = (dog: Dog) => {
		navigate(`/trainer/dogs/${dog.id}`);
	};

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
		<>
			<PlanningHeader
				title={title}
				buttonLabel="event"
				href="/trainer/planning/new"
			/>
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
					timeZone="Europe/Paris"
					height="auto"
					events={isTrainer ? events : ownerEvents}
					views={{
						dayGridMonth: { buttonText: "Mois" },
						timeGridWeek: {
							buttonText: "Semaine",
							slotMinTime: "06:00:00",
							slotMaxTime: "21:00:00",
							slotDuration: "00:30:00",
						},
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
						// Si on est en vue mensuelle et en mode mobile, afficher un rond
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
						// Function to formate the date with startDate and endDate
						const formatEventDateTime = (startDate: Date, endDate: Date) => {
							const formatDate = (date: Date) => {
								const days = [
									"dimanche",
									"lundi",
									"mardi",
									"mercredi",
									"jeudi",
									"vendredi",
									"samedi",
								];
								const day = days[date.getDay()];
								const dayNum = date.getDate().toString().padStart(2, "0");
								const month = (date.getMonth() + 1).toString().padStart(2, "0");
								const year = date.getFullYear();

								return `${day} ${dayNum}/${month}/${year}`;
							};

							const formatTime = (date: Date) => {
								const hours = date.getHours().toString().padStart(2, "0");
								const minutes = date.getMinutes().toString().padStart(2, "0");

								return `${hours}h${minutes}`;
							};

							return `Le ${formatDate(startDate)} de ${formatTime(startDate)} jusqu'à ${formatTime(endDate)}`;
						};

						// Checking if start or end is null
						if (arg.event.start === null || arg.event.end === null) {
							return <p>"Aucune date trouvée pour cet événement"</p>;
						}

						if (currentView === "listWeek") {
							return (
								<section className="event__section--global">
									<div className="event-content-list">
										<div className="event-card">
											<div className="event-title">{arg.event.title}</div>
											<div className="eventDetail__event--service">
												{arg.event.extendedProps.services.map(
													(service: ServiceType, index: number) => (
														<Service
															service={service}
															key={service.id || `service-${index}`}
														/>
													),
												)}
											</div>
											<div className="event-date-and-time">
												<CalendarWithClock className="event__icons" />
												{formatEventDateTime(arg.event.start, arg.event.end)}
											</div>
											<div className="event-location">
												<MapPin className="event__icons" />
												{arg.event.extendedProps.location.latitude},
												{arg.event.extendedProps.location.longitude}
											</div>
										</div>
									</div>
									<div className="event__div--participation">
										<div className="participants-title">Participants</div>
										<div className="participants-wrapper">
											<DogBubbles
												dogs={arg.event.extendedProps.dogs}
												maxSize={arg.event.extendedProps.group_max_size}
												onDogClick={handleDogClick}
											/>
										</div>
									</div>
								</section>
							);
						}
					}}
					// Navigate to event details where we can update or delete the event
					eventClick={(clickInfo) => {
						// Get event id to use it in the path
						const eventId = clickInfo.event.id;
						const userRole = user?.role;
						// Navigate to the event depending on the role
						if (userRole === "trainer") {
							navigate(`/trainer/planning/my-events/${eventId}`);
						} else if (userRole === "owner") {
							navigate(`/owner/planning/${eventId}`);
						} else {
							// If an unauthorized user tries to force the URL
							console.error("Vous n'êtes pas autorisé à voir cet événement");
						}
					}}
				/>
			</div>
		</>
	);
}

export default Planning;

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

// Icons
import { CalendarWithClock } from "@/assets/icons/calendar-with-clock";
import { MapPin } from "@/assets/icons/map-pin";

// Interfaces
import { Event, GetAllEventsData } from "@/types/Event";

function Planning() {
	/* Business logic */

	const navigate = useNavigate();
	const { user } = useUser();
	const { data } = useQuery<GetAllEventsData>(GET_ALL_EVENTS);

	const events =
		data?.getAllEvents.map((event: Event) => ({
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
			{user?.role === "trainer" && (
				<PlanningHeader
					title={title}
					buttonLabel="event"
					href="/trainer/planning/new"
				/>
			)}
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

							// Condition pour vérifier si l'événement s'étend sur plusieurs jours
							if (startDate.getDate() !== endDate.getDate()) {
								return `Le ${formatDate(startDate)} au ${formatDate(endDate)} de ${formatTime(startDate)} jusqu'à ${formatTime(endDate)}`;
							} else {
								return `Le ${formatDate(startDate)} de ${formatTime(startDate)} jusqu'à ${formatTime(endDate)}`;
							}
						};

						if (currentView === "listWeek") {
							return (
								<section className="event__section--global">
									<div className="event-content-list">
										<div className="event-card">
											<div className="event-title">{arg.event.title}</div>
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
											<div className="participants-card">
												{/* Logique à ajouter pour afficher les chiens participants */}
												{/* Placeholder pour l'instant */}
												<div>Liste des chiens participants</div>
											</div>
											<div className="participants-count">
												2 chiens / 3 places disponibles
											</div>
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
						// Navigate to the event in function of the role
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

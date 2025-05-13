import "./EventDetail.scss";

import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader.tsx";
import LoadingIndicator from "@/components/_atoms/LoadingIndicator/LoadingIndicator";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import Service from "@/components/_atoms/Service/Service";
import AddressSearchMap from "@/components/_molecules/AdressSearchMap/AdressSearchMap";
import ParticipantsOverview from "@/components/_molecules/ParticipantsOverview/ParticipantsOverview";
import EventActionsByRole from "./Controls/EventActionsByRole";

import { useUser } from "@/hooks/useUser";
import { useDateFormatter } from "@/hooks/useDateFormatter";

import type { Event } from "@/types/Event";
import type { Dog } from "@/types/Dog";

export default function EventDetail() {
	const { user } = useUser();
	const { extractDate, extractTime } = useDateFormatter();

	const loaderData = useLoaderData() as {
		event: Promise<Event>;
		dogs: Promise<Dog[]>;
	};

	if (!user) return <LoadingIndicator />;

	return (
		<>
			<PlanningHeader
				title="Planning"
				buttonLabel="event"
				href="/trainer/planning/event/new"
			/>
			<Suspense fallback={<LoadingIndicator />}>
				<Await
					resolve={Promise.all([loaderData.event, loaderData.dogs])}
					errorElement={<div>Erreur lors du chargement de l'événement.</div>}
				>
					{([event, dogs]: [Event, Dog[]]) => {
						const participantsCount = event.participation?.length ?? 0;
						const availableSlots = Math.max(
							0,
							event.group_max_size - participantsCount,
						);

						return (
							<section className="eventDetail__section">
								<div className="eventDetail__event">
									<div className="eventDetail__event--card">
										<div className="eventDetail__event--title">
											{event.title}
										</div>
										<div className="eventDetail__event--service">
											{event.services.map((service) => (
												<Service service={service} key={service.id} />
											))}
										</div>

										{user.role === "owner" && (
											<span className="createEvent__event eventDetail__margin">
												<label className="eventDetail__leftSlot">
													Nombre de place(s) disponible(s) restante(s)
													<input
														className="createEvent__input"
														type="string"
														value={
															availableSlots > 0 ? availableSlots : "Complet"
														}
														disabled={true}
													/>
												</label>
											</span>
										)}

										<span className="createEvent__event createEvent__event--dates eventDetail__margin">
											<label className="createEvent__event--date">
												Date de l'évènement
												<input
													className="createEvent__input"
													type="date"
													defaultValue={extractDate(event.startDate)}
													disabled={true}
												/>
											</label>
											<label className="createEvent__event--startTime">
												Heure de début
												<input
													className="createEvent__input"
													type="time"
													defaultValue={extractTime(event.startDate)}
													disabled={true}
												/>
											</label>
											<label className="createEvent__event--endDate">
												Heure de fin
												<input
													className="createEvent__input"
													type="time"
													defaultValue={extractTime(event.endDate)}
													disabled={true}
												/>
											</label>
										</span>

										<TextInput
											className="createEvent__event eventDetail__description eventDetail__margin"
											label="Description"
											inputType="textarea"
											name="description"
											type="description"
											value={event.description}
											onChange={() => ""}
										/>

										<AddressSearchMap markerLocation={event.location} display />

										<EventActionsByRole />
									</div>
								</div>

								<div className="eventDetail__participation">
									{user.role === "trainer" ? (
										<ParticipantsOverview
											title="Participants"
											type="dogs"
											event={event}
											dogs={dogs}
											context="event"
										/>
									) : (
										<ParticipantsOverview
											title="Éducateur"
											type="trainer"
											event={event}
											context="event"
										/>
									)}
								</div>
							</section>
						);
					}}
				</Await>
			</Suspense>
		</>
	);
}

import { gql } from "@apollo/client";
import {
	EVENT_FRAGMENT,
	SERVICE_FRAGMENT,
	TRAINER_FRAGMENT,
} from "../fragments/fragments";

export const DELETE_EVENT = gql`
  mutation DeleteEvent($eventId: Float!) {
    deleteEvent(eventId: $eventId)
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $price: Float!, 
    $groupMaxSize: Float!, 
    $location: LocationInput!, 
    $description: String!, 
    $title: String!, 
    $serviceIds: [Float!], 
    $trainerId: Float!, 
    $eventId: Float!, 
    $startDate: DateTimeISO!, 
    $endDate: DateTimeISO!) {
  updateEvent(
    price: $price, 
    group_max_size: $groupMaxSize, 
    location: $location, 
    description: $description, 
    title: $title, 
    serviceIds: $serviceIds, 
    trainerId: $trainerId, 
    eventId: $eventId, 
    startDate: $startDate, 
    endDate: $endDate) {
      price
      description
      endDate
      group_max_size
      location {
        latitude
        longitude
      }
      startDate
      title
  }
}
`;

export const CREATE_EVENT = gql`
mutation CreateEvent(
  $endDate: DateTimeISO!, 
  $startDate: DateTimeISO!, 
  $price: Float!, 
  $groupMaxSize: Float!, 
  $location: LocationInput!, 
  $description: String!, 
  $title: String!, 
  $trainerId: Float!, 
  $serviceIds: [Float!]
  ) {
  createEvent(
    endDate: $endDate, 
    startDate: $startDate, 
    price: $price, 
    group_max_size: $groupMaxSize, 
    location: $location, 
    description: $description, 
    title: $title, 
    trainerId: $trainerId, 
    serviceIds: $serviceIds
    ) {
      ...EventFragment
      services {
        ...ServiceFragment
      }
      trainer {
        ...TrainerFragment
      }
    }
  }
  ${EVENT_FRAGMENT}
  ${SERVICE_FRAGMENT}
  ${TRAINER_FRAGMENT}
`;

export const DELETE_EVENT_BY_ID = gql`
  mutation DeleteEventById($eventId: Float!) {
    deleteEvent(eventId: $eventId)
  }
`;

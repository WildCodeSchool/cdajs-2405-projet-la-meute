import { gql } from "@apollo/client";

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
    $date: DateTimeISO!, 
    $serviceId: Float!, 
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
    date: $date, 
    serviceId: $serviceId, 
    trainerId: $trainerId, 
    eventId: $eventId, 
    startDate: $startDate, 
    endDate: $endDate) {
      price
      date
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

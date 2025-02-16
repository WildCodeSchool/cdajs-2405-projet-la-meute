import { gql } from "@apollo/client";

export const DELETE_EVENT = gql`
  mutation DeleteEvent($eventId: Float!) {
    deleteEvent(eventId: $eventId)
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $eventId: Float!,
    $trainerId: Float,
    $serviceId: Float,
    $date: DateTime,
    $title: String,
    $description: String,
    $location: LocationInput,
    $group_max_size: Float,
    $price: Float
  ) {
    updateEvent(
      eventId: $eventId,
      trainerId: $trainerId,
      serviceId: $serviceId,
      date: $date,
      title: $title,
      description: $description,
      location: $location,
      group_max_size: $group_max_size,
      price: $price
    ) {
      id
      date
      title
      description
      location {
        address
        city
        postal_code
        latitude
        longitude
      }
      group_max_size
      price
      trainer {
        id
        user {
          id
          firstname
          lastname
        }
      }
      service {
        id
        name
      }
    }
  }
`;

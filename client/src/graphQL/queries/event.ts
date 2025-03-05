import { gql } from "@apollo/client";

export const GET_ALL_EVENTS = gql`
    query GetAllEvents {
        getAllEvents {
            id
            date
            title
            description
            group_max_size
            location {
            latitude
            longitude
            }
            price
            startDate
            endDate
        }
    }
`;

export const GET_EVENT_BY_ID = gql`
    query GetEventById($eventId: Float!) {
        getEventById(eventId: $eventId) {
            id
            title
            date
            startDate
            endDate
            description
            location {
            latitude
            longitude
            }
            group_max_size
            price
        }
    }
`;

export const GET_ALL_EVENTS_BY_OWNER_ID = gql`
query GetAllEventsByOwnerId($ownerId: Float!) {
    getAllEventsByOwnerId(ownerId: $ownerId) {
        id
        title
        date
        startDate
        endDate
        description
        location {
        latitude
        longitude
        }
        group_max_size
        price
    }
  }
`;

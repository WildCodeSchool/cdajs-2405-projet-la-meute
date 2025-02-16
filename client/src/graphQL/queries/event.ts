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
        }
    }
`;

export const GET_EVENT_BY_ID = gql`
    query GetEventById($eventId: Float!) {
        getEventById(eventId: $eventId) {
            id
            date
            title
            description
            location {
                latitude
                longitude
            }
            group_max_size
        }
    }
`;

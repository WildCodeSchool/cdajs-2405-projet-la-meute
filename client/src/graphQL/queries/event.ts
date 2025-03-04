import { gql } from "@apollo/client";

export const GET_ALL_EVENTS = gql`
    query GetAllEvents {
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
                service {
                    id
                    title
                }
            }
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
            service {
                id
                title
            }
        }
    }
`;

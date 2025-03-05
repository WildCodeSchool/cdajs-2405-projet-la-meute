import { gql } from "@apollo/client";

export const GET_ALL_SERVICES = gql`
    query GetAllServices {
        getAllServices {
            id
            title
            smiley
            color
        }
    }
`;

export const GET_SERVICE_BY_ID = gql`
    query GetServiceById($serviceId: Float!) {
        getServiceById(id: $serviceId) {
            id
            title
            smiley
            color
        }
    }
`;

export const GET_SERVICES_BY_EVENT_ID = gql`
    query GetServicesByEventId($eventId: Float!) {
        getServicesByEventId(eventId: $eventId) {
            id
            title
            smiley
            color
        }
    }
`;

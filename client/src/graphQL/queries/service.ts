import { gql } from "@apollo/client";
import { SERVICE_FRAGMENT } from "../fragments/fragments";

export const GET_ALL_SERVICES = gql`
    query GetAllServices {
        getAllServices {
            ...ServiceFragment
        }
    }
    ${SERVICE_FRAGMENT}
`;

export const GET_SERVICE_BY_ID = gql`
    query GetServiceById($serviceId: Float!) {
        getServiceById(id: $serviceId) {
            ...ServiceFragment
        }
    }
    ${SERVICE_FRAGMENT}
`;

export const GET_SERVICES_BY_EVENT_ID = gql`
    query GetServicesByEventId($eventId: Float!) {
        getServicesByEventId(eventId: $eventId) {
            ...ServiceFragment
        }
    }
    ${SERVICE_FRAGMENT}
`;

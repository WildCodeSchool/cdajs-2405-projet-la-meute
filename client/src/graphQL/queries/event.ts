import { gql } from "@apollo/client";

import {
	EVENT_FRAGMENT,
	SERVICE_FRAGMENT,
	TRAINER_FRAGMENT,
} from "../fragments/fragments";

export const GET_ALL_EVENTS = gql`
    query GetAllEvents {
        getAllEvents {
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
    ${TRAINER_FRAGMENT}
    ${SERVICE_FRAGMENT}
`;

export const GET_EVENT_BY_ID = gql`
    query GetEventById($eventId: Float!) {
        getEventById(eventId: $eventId) {
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
    ${TRAINER_FRAGMENT}
    ${SERVICE_FRAGMENT}
`;

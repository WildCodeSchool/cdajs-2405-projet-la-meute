import {
	DOG_FRAGMENT,
	EVENT_FRAGMENT,
	SERVICE_FRAGMENT,
	TRAINER_FRAGMENT,
} from "@/graphQL/fragments/fragments";
import { gql } from "@apollo/client";

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
        participation {
            dog {
                ...DogFragment
            }
        }
    }
}
${EVENT_FRAGMENT}
${TRAINER_FRAGMENT}
${SERVICE_FRAGMENT}
${DOG_FRAGMENT}
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
            participation {
                dog {
                    ...DogFragment
                }
            }
        }
    }
    ${EVENT_FRAGMENT}
    ${TRAINER_FRAGMENT}
    ${SERVICE_FRAGMENT}
    ${DOG_FRAGMENT}
`;

export const GET_ALL_EVENTS_BY_TRAINER_ID = gql`
    query GetAllEventsByTrainerId($trainerId: Float!) {
        getAllEventsByTrainerId(trainerId: $trainerId) {
        ...EventFragment
            services {
                ...ServiceFragment
            }
            participation {
                id
                dog {
                    picture
                    id
                    name
                }
            }
        }
    }
    ${EVENT_FRAGMENT}
    ${SERVICE_FRAGMENT}
`;

export const GET_ALL_EVENTS_BY_OWNER_ID = gql`
    query GetAllEventsByOwnerId($ownerId: Float!) {
        getAllEventsByOwnerId(ownerId: $ownerId) {
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

export const GET_DOGS_BY_EVENTS_ID = gql`
    query GetDogsByEventsId($eventId: Float!) {
        getDogsByEventsId(eventId: $eventId) {
            ...DogFragment
        }
    }
    ${DOG_FRAGMENT}
`;

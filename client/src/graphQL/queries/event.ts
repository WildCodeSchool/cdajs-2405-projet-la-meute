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
        participation {
            dog {
                birthDate
                breed
                getAge
                id
                info
                name
                picture
            }
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
            participation {
                dog {
                    id
                    name
                    birthDate
                    breed
                    picture
                    info
                    getAge
                }
            }
        }
    }
    ${EVENT_FRAGMENT}
    ${TRAINER_FRAGMENT}
    ${SERVICE_FRAGMENT}
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

export const GET_DOGS_BY_EVENTS_ID = gql`
query GetDogsByEventsId($eventId: Float!) {
  getDogsByEventsId(eventId: $eventId) {
    dog {
      id
      name
      getAge
      breed
      picture
      info
    }
  }
}
`;

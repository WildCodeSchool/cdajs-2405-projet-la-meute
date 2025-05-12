import { gql } from "@apollo/client";

import { EVENT_FRAGMENT, DOG_FRAGMENT } from "../fragments/fragments";

export const GET_PARTICIPATION_BY_ID = gql`
query GetParticipationById($participationId: Float!) {
    getParticipationById(participationId: $participationId) {
        id
            event {
                ...EventFragment
            }
            dog {
                ...DogFragment
            }
    }
}
${EVENT_FRAGMENT}
${DOG_FRAGMENT}
`;

export const GET_PARTICIPATIONS_BY_DOG_ID = gql`
query GetParticipationByDogId($dogId: Float!) {
    getParticipationByDogId(dogId: $dogId) {
        id
            event {
                ...EventFragment
            }
    }
}
${EVENT_FRAGMENT}
`;

export const GET_DOGS_BY_TRAINER_EVENTS = gql`
    query GetDogsByTrainerEvents($trainerId: Float!) {
        getDogsByTrainerEvents(trainerId: $trainerId) {
            id
            name
            birthDate
            breed
            picture
            info
            getAge
        }
    }
`;

import { gql } from "@apollo/client";

export const CREATE_PARTICIPATION = gql`
  mutation CreateParticipation($eventId: Float!, $dogId: Float!) {
    createParticipation(eventId: $eventId, dogId: $dogId) {
      id
    }
}
`;

export const DELETE_PARTICIPATION_BY_ID = gql`
  mutation Mutation($participationId: Float!) {
    deleteParticipationById(participationId: $participationId)
  }
`;

export const DELETE_PARTICIPATION_BY_EVENT_AND_DOG_ID = gql`
  mutation DeleteParticipationByEventAndDogId($eventId: Float!, $dogId: Float!) {
    deleteParticipationByEventIdAndDogId(eventId: $eventId, dogId: $dogId)
  }
`;

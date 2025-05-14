import { gql } from "@apollo/client";
import { TRAINER_FRAGMENT } from "../fragments/fragments";

export const GET_TRAINER_BY_ID = gql`
    query GetTrainerById($id: Float!) {
        getTrainerById(id: $id) {
            ...TrainerFragment
        }
    }
    ${TRAINER_FRAGMENT}
`;

export const GET_ALL_TRAINERS = gql`
    query GetAllTrainers {
        getAllTrainers {
            ...TrainerFragment
        }
    }
    ${TRAINER_FRAGMENT}
`;

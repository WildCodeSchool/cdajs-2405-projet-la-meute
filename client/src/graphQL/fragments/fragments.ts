import { gql } from "@apollo/client";

export const TRAINER_FRAGMENT = gql`
    fragment TrainerFragment on Trainer {
        id
        lastname
        firstname
        email
        phone_number
        city
        postal_code
        avatar
        siret
        company_name
        description
    }
`;

export const SERVICE_FRAGMENT = gql`
    fragment ServiceFragment on Service {
        id
        title
        smiley
        color
    }
`;

export const EVENT_FRAGMENT = gql`
    fragment EventFragment on Event {
        id
        title
        description
        location {
            latitude
            longitude
        }
        startDate
        endDate
        group_max_size
        price
    }
`;

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

export const OWNER_FRAGMENT = gql`
    fragment OwnerFragment on Owner {
        id
        lastname
        firstname
        email
        phone_number
        city
        postal_code
        avatar
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

export const FAVORITE_FRAGMENT = gql`
    fragment FavoriteFragment on Favorite {
        id
    }
`;

export const PARTICIPATION_FRAGMENT = gql`
    fragment ParticipationFragment on Participation {
        id
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
        startTime
        endDate
        endTime
        group_max_size
        price
    }
`;

export const DOG_FRAGMENT = gql`
    fragment DogFragment on Dog {
        id
        name
        birthDate
        breed
        picture
        info
        getAge
    }
`;

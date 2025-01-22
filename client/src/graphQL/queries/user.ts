import { gql } from "@apollo/client";

export const GET_ALL_OWNERS = gql`
    query GetAllOwners {
        getAllOwners {
            id
            lastname
            firstname
            email
            phone_number
            city
            postal_code
            role
        }
    }
`;

export const GET_OWNER_BY_EMAIL = gql`
    query GetUserByEmail($email: String!) {
        getUserByEmail(email: $email) {
        id
        lastname
        firstname
        email
        phone_number
        city
        postal_code
        role
        }
    }
`;

export const GET_TRAINER_BY_EMAIL = gql`
    query GetUserByEmail($email: String!) {
        getUserByEmail(email: $email) {
            id
            lastname
            firstname
            email
            phone_number
            city
            postal_code
            role
            siret
            company_name
            description
        }
    }
`;

export const ME = gql`
    query ME($token: String!) {
        me: ME(token: $token) {
            city
            lastname
            firstname
            phone_number
            postal_code
            role
        }
    }
`;

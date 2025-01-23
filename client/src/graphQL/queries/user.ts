import { gql } from "@apollo/client";

export const GET_ALL_OWNERS = gql`
    query GetAllOwners {
        getAllOwners {
            id
            name
            email
            phone_number
            city
            postal_code
            role
        }
    }
`;

export const GET_USER_BY_EMAIL = gql`
    query GetUserByEmail($email: String!) {
        getUserByEmail(email: $email) {
            id
            name
            email
            phone_number
            city
            postal_code
            role
        }
    }
`;

export const ME = gql`
    query ME($token: String!, $isTrainer: Boolean!) {
        me: ME(token: $token) {
            id
            lastname
            firstname
            email
            phone_number
            city
            postal_code
            role
            ... @include(if: $isTrainer) {
                siret
                company_name
            }
        }
    }
`;

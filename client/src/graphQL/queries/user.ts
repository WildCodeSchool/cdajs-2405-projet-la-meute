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

export const GET_USER_BY_EMAIL = gql`
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

export const ME = gql`
    query Me {
        me {
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

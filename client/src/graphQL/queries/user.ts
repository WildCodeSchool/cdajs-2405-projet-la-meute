import { gql } from "@apollo/client";

export const GET_ALL_OWNERS = gql`
    query GetAllOwners {
        getAllOwners {
            id
            name
            email
            password_hashed
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
            password_hashed
            phone_number
            city
            postal_code
            role
        }
    }
`;

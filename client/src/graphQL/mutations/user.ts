import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $lastname: String!
    $firstname: String!
    $email: String!
    $password: String!
    $phone_number: String
    $city: String!
    $postal_code: String!
    $role: String!
    $siret: String
    $company_name: String
  ) {
    registerUser(
      lastname: $lastname
      firstname: $firstname
      email: $email
      password: $password
      phone_number: $phone_number
      city: $city
      postal_code: $postal_code
      role: $role
      siret: $siret
      company_name: $company_name
    ) {
      id
      role
      email
    }
  }
`;

export const LOGIN = gql`
    mutation Login($password: String!, $email: String!) {
        login(password: $password, email: $email)
    }
`;

export const REQUESTPASSWORDRESET = gql`
  mutation RequestPasswordReset($email: String!) {
    RequestPasswordReset(email: $email) {
      message
      success
    }
  }
`;

export const PASSWORDRESET = gql`
  mutation PasswordReset($newPassword: String!, $token: String!) {
    PasswordReset(newPassword: $newPassword, token: $token) {
      message
      success
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updatedUser: UpdateUserInput!, $isTrainer: Boolean!) {
    UpdateUser(updatedUser: $updatedUser) {
      message
      user {
        id
            lastname
            firstname
            email
            phone_number
            city
            postal_code
            avatar
            role
            ... @include(if: $isTrainer) {
                siret
                company_name
                description
        }  
      }
    }
  }
`;

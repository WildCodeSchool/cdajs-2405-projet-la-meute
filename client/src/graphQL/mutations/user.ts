import { gql } from "@apollo/client";

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

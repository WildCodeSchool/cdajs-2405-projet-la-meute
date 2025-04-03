import { gql } from "@apollo/client";

export const SEARCH_QUERY = gql`
    query Search($query: String!) {
        search(query: $query) {
            id
            entity_type
            entity_id
        }
    }
`;

export const ENTITY_DETAILS_QUERY = gql`
    query GetEntityDetails($id: ID!, $entityType: String!) {
        event(id: $id) {
            type
            data
        }
    }
`;

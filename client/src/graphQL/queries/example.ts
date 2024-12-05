import { gql } from "@apollo/client";

export const GET_EXAMPLE_BY_ID = gql`
    query GetExampleById($getExampleByIdId: Float!) {
        getExampleById(id: $getExampleByIdId) {
            title
            category {
                title
            }
        }
    }
`;

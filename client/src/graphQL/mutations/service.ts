import { gql } from "@apollo/client";

export const CREATE_SERVICE = gql`
mutation CreateService($color: String!, $smiley: String!, $title: String!) {
    createService(color: $color, smiley: $smiley, title: $title) {
            id
            title
            smiley
            color
        }
    }
`;

export const UPDATE_SERVICE = gql`
mutation UpdateService($color: String, $smiley: String, $title: String, $updateServiceId: Float!) {
    updateService(color: $color, smiley: $smiley, title: $title, id: $updateServiceId) {
            id
            title
            smiley
            color
        }
    }
`;

export const DELETE_SERVICE = gql`
    mutation DeleteService($deleteServiceId: Float!) {
        deleteService(id: $deleteServiceId)
    }
`;

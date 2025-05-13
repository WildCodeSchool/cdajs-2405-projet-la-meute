import { gql } from "@apollo/client";
import { OWNER_FRAGMENT, DOG_FRAGMENT } from "../fragments/fragments";

export const GET_OWNER_BY_ID = gql`
  query GetOwnerById($id: Float!) {
    getOwnerById(id: $id) {
      ...OwnerFragment
    }
  }
  ${OWNER_FRAGMENT}
`;

export const GET_ALL_DOGS_BY_OWNER_ID = gql`
  query GetAllDogsByOwnerId($ownerId: Float!) {
    getAllDogsByOwnerId(ownerId: $ownerId) {
      ...DogFragment
    }
  }
  ${DOG_FRAGMENT}
`;

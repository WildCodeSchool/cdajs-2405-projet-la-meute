import { gql } from "@apollo/client";
import { DOG_FRAGMENT, OWNER_FRAGMENT } from "../fragments/fragments";

export const GET_ALL_DOGS_BY_OWNER_ID = gql`
  query GetAllDogsByOwnerId($ownerId: Float!) {
    getAllDogsByOwnerId(ownerId: $ownerId) {
      ...DogFragment
    }
  }
${DOG_FRAGMENT}
`;

export const GET_DOG_BY_ID = gql`
  query GetDogById($getDogByIdId: Float!) {
    getDogById(id: $getDogByIdId) {
      ...DogFragment
    }
  }
${DOG_FRAGMENT}
`;

export const GET_OWNER_BY_DOG_ID = gql`
  query GetOwnerByDogId($dogId: Float!) {
    getOwnerByDogId(dogId: $dogId) {
      ...OwnerFragment
    }
  }
${OWNER_FRAGMENT}
`;

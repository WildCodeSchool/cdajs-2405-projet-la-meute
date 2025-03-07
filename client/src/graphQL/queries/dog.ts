import { gql } from "@apollo/client";

export const GET_ALL_DOGS_BY_OWNER_ID = gql`
query GetAllDogsByOwnerId($ownerId: Float!) {
    getAllDogsByOwnerId(ownerId: $ownerId) {
      breed
      getAge
      id
      name
      picture
      info
    }
  }
`;

export const GET_DOG_BY_ID = gql`
query GetDogById($getDogByIdId: Float!) {
  getDogById(id: $getDogByIdId) {
    breed
    birthDate
    id
    info
    name
    picture
  }
}
`;

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
    id
    name
    breed
    birthDate
    info
    picture
  }
}
`;

export const GET_OWNER_BY_DOG_ID = gql`
query GetOwnerByDogId($dogId: Float!) {
  getOwnerByDogId(dogId: $dogId) {
    id
    lastname
    firstname
    email
    phone_number
    postal_code
    avatar
  }
}
`;

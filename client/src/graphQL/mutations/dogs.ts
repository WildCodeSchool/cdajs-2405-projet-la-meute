import { gql } from "@apollo/client";

export const DOG_PROFIL_PICTURE = gql`
    mutation Mutation($file: Upload!, $dogId: Float!) {
    uploadDogProfilePicture(file: $file, dogId: $dogId)
    }
`;

export const CREATE_DOG = gql`
mutation CreateDog($ownerId: Float!, $picture: Upload, $info: String, $breed: String, $birthDate: DateTimeISO, $name: String) {
    createDog(ownerId: $ownerId, picture: $picture, info: $info, breed: $breed, birthDate: $birthDate, name: $name) {
    name
    picture
    getAge
    breed
    info
    }
}
`;
export const UPDATE_DOG = gql`
mutation UpdateDog($ownerId: Float!, $dogId: Float!, $name: String, $birthDate: DateTimeISO, $breed: String, $info: String, $picture: Upload) {
    updateDog(ownerId: $ownerId, dogId: $dogId, name: $name, birthDate: $birthDate, breed: $breed, info: $info, picture: $picture) {
    breed
    getAge
    info
    name
    picture
    }
}
`;

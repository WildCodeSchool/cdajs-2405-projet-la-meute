import { gql } from "@apollo/client";

export const DOG_PROFIL_PICTURE = gql`
    mutation Mutation($file: Upload!, $dogId: Float!) {
    uploadDogProfilePicture(file: $file, dogId: $dogId)
    }
`;

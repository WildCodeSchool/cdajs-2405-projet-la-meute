import { gql } from "@apollo/client";
import {
	DOG_FRAGMENT,
	EVENT_FRAGMENT,
	FAVORITE_FRAGMENT,
	OWNER_FRAGMENT,
	PARTICIPATION_FRAGMENT,
	SERVICE_FRAGMENT,
	TRAINER_FRAGMENT,
} from "../fragments/fragments";

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
query GetEntityDetails($entityType: String!, $getEntityDetailsId: Float!) {
    GetEntityDetails(entityType: $entityType, id: $getEntityDetailsId) {
        type
        entity {
            ... on Dog {
                ...DogFragment
            }
            ... on Event {
                ...EventFragment
            }
            ... on Service {
                ...ServiceFragment
            }
            ... on Trainer {
                ...TrainerFragment
            }
            ... on Owner {
                ...OwnerFragment
            }
            ... on Favorite {
                ...FavoriteFragment
            }
            ... on Participation {
                ...ParticipationFragment
            }
        }
    }
}
${EVENT_FRAGMENT}
${DOG_FRAGMENT}
${SERVICE_FRAGMENT}
${TRAINER_FRAGMENT}
${OWNER_FRAGMENT}
${FAVORITE_FRAGMENT}
${PARTICIPATION_FRAGMENT}
`;

export const SEARCH_IN_CUSTOMER_BY_TRAINER_ID = gql`
    query SearchInCustomerByTrainerID($trainerId: Float!, $query: String!, $searchField: String) {
        searchInCustomerByTrainerID(trainerId: $trainerId, query: $query, searchField: $searchField) {
            entity {
            ... on Owner {
                ...OwnerFragment
                dogs {
                ...DogFragment
                }
            }
        }
    }
}
${DOG_FRAGMENT}
${OWNER_FRAGMENT}
`;

export const SEARCH_AVAILABLE_EVENTS = gql`
    query SearchAvailableEvents($query: String!, $searchField: String) {
        searchAvailableEvents(query: $query, searchField: $searchField) {
            entity {
                ... on Event {
                    ...EventFragment
                    trainer {
                        id
                        firstname
                        lastname
                        avatar
                    }
                    services {
                        ...ServiceFragment
                    }
                    participation {
                        id
                        dog {
                            ...DogFragment
                        }
                    }
                }
            }
        }
    }
${EVENT_FRAGMENT}
${SERVICE_FRAGMENT}
${DOG_FRAGMENT}
`;

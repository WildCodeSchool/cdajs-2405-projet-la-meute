import { gql } from "@apollo/client";

export const GET_ALL_EVENTS = gql`
query GetAllEvents {
    getAllEvents {
        id
        date
        title
        description
        group_max_size
        location {
        latitude
        longitude
        }
        price
        startDate
        endDate
        participation {
            dog {
                birthDate
                breed
                getAge
                id
                info
                name
                picture
            }
        }
    }
}
`;

export const GET_EVENT_BY_ID = gql`
    query GetEventById($eventId: Float!) {
        getEventById(eventId: $eventId) {
            id
            date
            title
            description
            location {
            latitude
            longitude
            }
            group_max_size
            price
            startDate
            endDate
            participation {
                dog {
                    id
                    name
                    birthDate
                    breed
                    picture
                    info
                    getAge
                }
            }
        }
    }
`;

export const GET_ALL_EVENTS_BY_OWNER_ID = gql`
query GetAllEventsByOwnerId($ownerId: Float!) {
    getAllEventsByOwnerId(ownerId: $ownerId) {
        id
        title
        date
        startDate
        endDate
        description
        location {
        latitude
        longitude
        }
        group_max_size
        price
    }
  }
`;

export const GET_DOGS_BY_EVENTS_ID = gql`
query GetDogsByEventsId($eventId: Float!) {
  getDogsByEventsId(eventId: $eventId) {
    dog {
      id
      name
      getAge
      breed
      picture
      info
    }
  }
}
`;

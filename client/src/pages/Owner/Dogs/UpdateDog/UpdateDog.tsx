import DogForm from "../DogForm/DogForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_DOG_BY_ID } from "@/graphQL/queries/dog";

export default function UpdateDog() {
	const { id } = useParams();

	const { data, loading } = useQuery(GET_DOG_BY_ID, {
		variables: {
			getDogByIdId: Number(id),
		},
	});

	if (loading) {
		return <p>loading...</p>;
	}

	return <DogForm mode="update" initialData={data.getDogById} />;
}

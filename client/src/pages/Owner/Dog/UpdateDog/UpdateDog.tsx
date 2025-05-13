import DogForm from "../DogForm/DogForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_DOG_BY_ID } from "@/graphQL/queries/dog";
import LoadingIndicator from "@/components/_atoms/LoadingIndicator/LoadingIndicator";

export default function UpdateDog() {
	const { id } = useParams();

	const { data, loading } = useQuery(GET_DOG_BY_ID, {
		variables: {
			getDogByIdId: Number(id),
		},
	});

	if (loading) {
		return <LoadingIndicator />;
	}

	return <DogForm mode="update" initialData={data.getDogById} />;
}

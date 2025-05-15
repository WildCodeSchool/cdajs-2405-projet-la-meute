import LoadingIndicator from "@/components/_atoms/LoadingIndicator/LoadingIndicator";
import { GET_DOG_BY_ID } from "@/graphQL/queries/dog";
import DogForm from "@/pages/Owner/Dog/DogForm/DogForm";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

export default function UpdateDog() {
	const { id } = useParams();

	const { data, loading } = useQuery(GET_DOG_BY_ID, {
		variables: { getDogByIdId: Number(id) },
	});

	if (loading) {
		return <LoadingIndicator />;
	}

	return <DogForm mode="update" initialData={data.getDogById} />;
}

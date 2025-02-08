import "./MyDogList.scss";
import Button from "@/components/_atoms/Button/Button";
import IdCard from "@/components/_molecules/Card/IdCard";
import { GET_ALL_DOGS_BY_OWNER_ID } from "@/graphQL/queries/dog";

import { useQuery } from "@apollo/client";
import { useUser } from "@/hooks/useUser";

import type { Dog } from "@/types/Dog";

function MyDogList() {
	const { user } = useUser();
	const { data, loading, error } = useQuery(GET_ALL_DOGS_BY_OWNER_ID, {
		variables: {
			ownerId: user?.id ? Number(user.id) : null,
		},
		skip: !user?.id,
	});

	const dogs = data?.getAllDogsByOwnerId || [];

	if (loading) {
		return <p>loading...</p>;
	}
	if (error) {
		return <p>{error.message}</p>;
	}

	return (
		<main className="myDogList">
			<section className="myDogList__title">
				<h2>Mes chiens</h2>
				<span className="myDogList__title--count">{dogs.length}</span>
			</section>
			<section className="myDogList__list">
				{dogs.map((dog: Dog) => (
					<IdCard key={dog.id} type="dog" data={dog} />
				))}
			</section>
			<span className="myDogList__button">
				<Button href="/owner/my-dogs/new" style="thin-btn-light">
					+ Ajouter un nouveau chien
				</Button>
			</span>
		</main>
	);
}

export default MyDogList;

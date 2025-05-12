import IdCard from "@/components/_molecules/Card/IdCard";
import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";
import { GET_DOGS_BY_TRAINER_EVENTS } from "@/graphQL/queries/participation";
import { useUser } from "@/hooks/useUser";
import type { Dog } from "@/types/Dog";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import "./DogsList.scss";

function DogsList() {
	const { user } = useUser();
	const { data, loading, refetch } = useQuery(GET_DOGS_BY_TRAINER_EVENTS, {
		variables: {
			trainerId: user?.id ? Number(user.id) : null,
		},
		skip: !user?.id,
	});

	useEffect(() => {
		if (user?.id) {
			refetch();
		}
	}, [refetch, user?.id]);

	const dogs = data?.getDogsByTrainerEvents || [];

	if (loading) {
		return <p>loading...</p>;
	}

	return (
		<>
			<PlanningHeader
				title={"Chiens"}
				buttonLabel="invite"
				href="mailto:contact@pawplanner.com"
			/>
			<section className="DogsList__infosPage">
				{dogs.length > 0 ? (
					<p>
						Cette liste regroupe les chiens participants à vos évènements,
						passés ou à venir.
					</p>
				) : (
					<p>Pas encore de chiens participants à vos évènements.</p>
				)}
			</section>
			<section className="DogsList__idCardsDogs">
				{dogs.map((dog: Dog) => (
					<IdCard key={dog.id} type="dog" data={dog} trainerView />
				))}
			</section>
		</>
	);
}

export default DogsList;

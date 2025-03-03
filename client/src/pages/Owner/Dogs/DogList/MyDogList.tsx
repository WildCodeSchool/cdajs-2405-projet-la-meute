import "./MyDogList.scss";
import Button from "@/components/_atoms/Button/Button";
import IdCard from "@/components/_molecules/Card/IdCard";
import { GET_ALL_DOGS_BY_OWNER_ID } from "@/graphQL/queries/dog";

import { useQuery } from "@apollo/client";
import { useUser } from "@/hooks/useUser";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import type { Dog } from "@/types/Dog";

function MyDogList() {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.state?.message) {
			alert(location.state.message);
			navigate(location.pathname, { replace: true });
		}
	}, [location, navigate]);

	const { user } = useUser();
	const { data, loading } = useQuery(GET_ALL_DOGS_BY_OWNER_ID, {
		variables: {
			ownerId: user?.id ? Number(user.id) : null,
		},
		skip: !user?.id,
	});

	const dogs = data?.getAllDogsByOwnerId || [];

	if (loading) {
		return <p>loading...</p>;
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
				<Button
					href="/owner/my-dogs/new"
					style={{ type: "thin-btn-light", color: "orange" }}
				>
					+ Ajouter un nouveau chien
				</Button>
			</span>
		</main>
	);
}

export default MyDogList;

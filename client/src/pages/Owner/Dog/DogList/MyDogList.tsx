import "./MyDogList.scss";
import { toast } from "react-toastify";
import Button from "@/components/_atoms/Button/Button";
import IdCard from "@/components/_molecules/Card/IdCard";
import { GET_ALL_DOGS_BY_OWNER_ID } from "@/graphQL/queries/dog";

import { useQuery } from "@apollo/client";
import { useUser } from "@/hooks/useUser";

import type { Dog } from "@/types/Dog";
import { useEffect } from "react";

function MyDogList() {
	const alert = () => {
		const message = sessionStorage.getItem("dogAlert");
		if (message) {
			toast.success(message, {
				icon: () => <span>🐶</span>,
			});
			sessionStorage.removeItem("dogAlert");
		}
	};

	const { user } = useUser();
	const { data, loading, refetch } = useQuery(GET_ALL_DOGS_BY_OWNER_ID, {
		variables: {
			ownerId: user?.id ? Number(user.id) : null,
		},
		skip: !user?.id,
	});

	useEffect(() => {
		if (user?.id) {
			refetch();
		}
	}, [refetch, user?.id]);

	const dogs = data?.getAllDogsByOwnerId || [];

	if (loading) {
		return <p>loading...</p>;
	}

	return (
		<main className="myDogList" onLoad={alert}>
			<section className="myDogList__title">
				<h2>Mes chiens</h2>
				<span className="myDogList__title--count">{dogs.length}</span>
			</section>
			<section className="myDogList__list">
				{dogs.map((dog: Dog) => (
					<IdCard key={dog.id} type="dog" data={dog} ownerView />
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

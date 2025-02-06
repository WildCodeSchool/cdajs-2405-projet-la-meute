import { useUser } from "@/hooks/useUser";

export const TestME = () => {
	const { user, isLoading, isAuthenticated } = useUser();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!isAuthenticated || !user) {
		return <div>Erreur lors du chargement des données</div>;
	}

	return (
		<div>
			<div>
				<h1>
					Bienvenue {user.firstname} {user.lastname}
				</h1>
			</div>

			<div>
				<div>
					<div>
						<p>Email : {user.email}</p>
						<p>Téléphone : {user.phone_number || "Non renseigné"}</p>
					</div>
					<div>
						<p>Ville : {user.city}</p>
						<p>Code postal : {user.postal_code}</p>
					</div>
				</div>
			</div>

			{user.role === "trainer" && (
				<div>
					<h2>Informations professionnelles</h2>
					<div>
						<p>Entreprise : {user.company_name}</p>
						<p>SIRET : {user.siret}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default TestME;

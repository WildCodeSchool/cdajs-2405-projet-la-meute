import "@/pages/Homepage/Homepage.scss";
import Image from "@/assets/illustrations/chien-tenant-en-laisse-plusieurs-chiens-en-ville-1500px.png";

function Homepage() {
	return (
		<main className="homepage">
			<section className="homepage__section--top">
				<div className="homepage__div--top-text">
					<h1 className="homepage__title">Votre temps est précieux...</h1>
					<article>
						<h2>
							Gagnez du temps, facilitez vos échanges ! Paw Planner est un outil
							de mise en relation et de prise de rendez-vous entre les
							éducateur·rices canin·es et leurs clients.
						</h2>
						<p>
							<strong>Éducateur·rices</strong>, gérez vos plannings et suivez
							facilement l'historique de chaque chien dont vous vous occupez.
						</p>
						<p>
							<strong>Propriétaires</strong>, prenez rendez-vous en ligne avec
							vos éducateur·rices préférés et gérez l'éducation de votre chien.
						</p>
					</article>
				</div>
				<div className="homepage__div--top-img">
					<img src={Image} alt="Femme promenant ses chiens" />
				</div>
			</section>

			<section className="homepage__section--choice">
				<h2 className="homepage__title">De quel côté êtes-vous&nbsp;?</h2>
				<div className="homepage__div--choice">
					<div className="homepage__div--choice-left">
						<h3 className="homepage__div--choice-title">
							🙋🏻‍♂️ Éducateur·rice canin·e
						</h3>
						<p className="homepage__div--choice-text">
							Optimisez votre emploi du temps grâce à notre plateforme de
							gestion de planning. En tant qu’éducateur·rice canin·e, vous
							pourrez facilement gérer vos rendez-vous, suivre les progrès de
							chaque chien et communiquer directement avec les propriétaires !
						</p>
					</div>
					<div className="homepage__div--choice-right">
						<h3 className="homepage__div--choice-title">
							🐶 Propriétaire de chien
						</h3>
						<p className="homepage__div--choice-text">
							Simplifiez la gestion des séances avec votre éducateur·rice
							canin·e. En tant que propriétaire, vous pouvez consulter
							facilement les disponibilités, prendre des rendez-vous en ligne et
							suivre l'historique de votre chien. Tout est à portée de clic,
							pour un apprentissage efficace et adapté à ses besoins.
						</p>
					</div>
				</div>
			</section>

			<section className="homepage__features">
				<h2 className="homepage__title">Nos outils clés</h2>
				{/* Cards */}
				<div className="homepage__features--cards">
					<div className="homepage__features--card">
						<h3>Planning</h3>
						<p>
							Organisez facilement votre emploi du temps avec un planning
							intuitif. Gérez vos rendez-vous et disponibilités en quelques
							clics, pour une gestion simplifiée.
						</p>
					</div>
					<div className="homepage__features--card">
						<h3>Gestion des événements</h3>
						<p>
							Créez, modifiez et gérez vos événements directement sur la
							plateforme. Suivez les séances et les interactions avec chaque
							propriétaire de manière fluide et efficace.
						</p>
					</div>
					<div className="homepage__features--card">
						<h3>Rappels et alertes</h3>
						<p>
							Recevez des rappels automatiques pour vos rendez-vous et
							événements à venir. Ne manquez jamais une session grâce à nos
							alertes personnalisées et pratiques.
						</p>
					</div>
					<div className="homepage__features--card">
						<h3>Recherche d'événements</h3>
						<p>
							Trouvez rapidement les événements ou séances spécifiques grâce à
							notre moteur de recherche optimisé. Accédez facilement à ce dont
							vous avez besoin en un instant.
						</p>
					</div>
					<div className="homepage__features--card">
						<h3>Profil personnalisable</h3>
						<p>
							Personnalisez votre profil avec vos informations, services et
							horaires. Offrez une expérience sur mesure pour chaque
							propriétaire et un accès rapide à vos disponibilités.
						</p>
					</div>
					<div className="homepage__features--card">
						<h3>Ajout de plusieurs chiens</h3>
						<p>
							Ajoutez et gérez plusieurs chiens sur votre compte. Suivez leur
							progrès individuellement et organisez les séances pour chaque
							chien en toute simplicité.
						</p>
					</div>
				</div>
			</section>
		</main>
	);
}

export default Homepage;

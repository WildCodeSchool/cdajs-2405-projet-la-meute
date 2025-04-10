import "./LegalNotice.scss";
import { Link } from "react-router-dom";

function LegalNotice() {
	return (
		<main className="page-legal__section">
			<div className="container_legal">
				<h1>Mentions légales</h1>
				<p className="last-update">Dernière mise à jour : 08/04/2025</p>

				<div className="introduction">
					<p>
						Le site <strong>PawPlanner</strong> est édité par la société
						PawPlanner, SARL au capital de ronronnements infinis (et un peu de
						caféine), ayant son siège social au :
					</p>
					<p>
						<span>📍</span> 42 rue des Croquettes Infinies, 75000 Chat-Paris
					</p>
					<p>
						Email de contact :{" "}
						<strong>
							<a href="mailto:contact@pawplanner.com">contact@pawplanner.com</a>
						</strong>
					</p>
				</div>

				<section className="term-section">
					<h2>1. 👤 Directeur de la publication</h2>
					<p>
						L'équipe PawPlanner, composée de{" "}
						<a href="https://github.com/Dolpheus89" target="_blank">
							Florian
						</a>
						,{" "}
						<a href="https://github.com/FlorenceBuchelet" target="_blank">
							Florence
						</a>
						,{" "}
						<a href="https://github.com/Carcali" target="_blank">
							Julien
						</a>{" "}
						et{" "}
						<a href="https://github.com/Melprcllr" target="_blank">
							Mélissa
						</a>
						, quatre humains passionnés par les animaux et l'organisation
						parfaite (surtout quand elle inclut des chiens et des chats 🐕🐈).
					</p>
				</section>

				<section className="term-section">
					<h2>2. 🖥️ Hébergement du site</h2>
					<p>
						Le site est hébergé par <strong>OVH</strong>
					</p>
					<p>2 rue Kellermann – 59100 Roubaix – France</p>
					<p>
						Site web :{" "}
						<a
							href="https://www.ovh.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							www.ovh.com
						</a>
					</p>
				</section>

				<section className="term-section">
					<h2>3. 📄 Propriété intellectuelle</h2>
					<p>
						Tous les contenus présents sur le site (textes, images,
						illustrations, logo, etc.) sont la propriété exclusive de
						PawPlanner, sauf mention contraire. Toute reproduction,
						représentation, modification ou adaptation, totale ou partielle, est
						interdite sans autorisation écrite préalable.
					</p>
				</section>

				<section className="term-section">
					<h2>4. ⚠️ Responsabilité</h2>
					<p>
						L'équipe PawPlanner met tout en œuvre pour proposer un site
						fonctionnel et agréable. Toutefois, elle ne saurait être tenue
						responsable en cas de bugs, de contenus externes ou de disparition
						temporaire de croquettes.
					</p>
				</section>

				<div className="conclusion">
					<p>
						<strong>
							© {new Date().getFullYear()} PawPlanner - Tous droits réservés
						</strong>
					</p>
				</div>
			</div>
		</main>
	);
}

export default LegalNotice;

import React from "react";
import "./LegalNotice.scss";

function LegalNotice() {
	return (
		<main className="legalNotice__section">
			<div className="legalNotice__section--title">
				<span>🐾</span>
				<h2> Mentions légales</h2>
			</div>
			<p>
				Le site <strong>PawPlanner</strong> est édité par la société PawPlanner,
				SARL au capital de ronronnements infinis (et un peu de caféine), ayant
				son siège social au :
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

			<h3>1. Directeur de la publication</h3>
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
				, quatre humains passionnés par les animaux et l'organisation parfaite
				(surtout quand elle inclut des chiens et des chats 🐕🐈).
			</p>

			<h3>2. Hébergement du site</h3>
			<p>
				Le site est hébergé par <strong>OVH</strong>
			</p>
			<p>2 rue Kellermann – 59100 Roubaix – France</p>
			<p>
				Site web :{" "}
				<a href="https://www.ovh.com" target="_blank" rel="noopener noreferrer">
					www.ovh.com
				</a>
			</p>

			<h3>3. Propriété intellectuelle</h3>
			<p>
				Tous les contenus présents sur le site (textes, images, illustrations,
				logo, etc.) sont la propriété exclusive de PawPlanner, sauf mention
				contraire. Toute reproduction, représentation, modification ou
				adaptation, totale ou partielle, est interdite sans autorisation écrite
				préalable.
			</p>

			<h3>4. Responsabilité</h3>
			<p>
				L'équipe PawPlanner met tout en œuvre pour proposer un site fonctionnel
				et agréable. Toutefois, elle ne saurait être tenue responsable en cas de
				bugs, de contenus externes ou de disparition temporaire de croquettes.
			</p>

			<p>
				<strong>
					© {new Date().getFullYear()} PawPlanner - Tous droits réservés
				</strong>
			</p>
		</main>
	);
}

export default LegalNotice;

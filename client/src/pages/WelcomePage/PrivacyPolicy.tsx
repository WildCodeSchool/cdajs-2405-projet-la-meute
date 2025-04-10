import "./PrivacyPolicy.scss";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
	return (
		<main className="page-privacy__section">
			<div className="container_privacy">
				<h1>Politique de confidentialité</h1>
				<p className="last-update">Dernière mise à jour : 08/04/2025</p>

				<div className="introduction">
					<p>
						Chez PawPlanner, la confidentialité de vos données (et de celles de
						vos animaux 🐶🐱) est une priorité. Nous nous engageons à respecter
						la législation en vigueur, notamment le Règlement Général sur la
						Protection des Données (RGPD).
					</p>
				</div>

				<section className="term-section">
					<h2>1. 📊 Données collectées</h2>
					<p>
						Lors de l'utilisation de PawPlanner, nous collectons certaines
						données personnelles que vous nous fournissez volontairement lors de
						la création d'un compte utilisateur.
					</p>
					<p>Ces données peuvent inclure :</p>
					<ul>
						<li>Votre prénom et/ou nom (si renseignés)</li>
						<li>Votre adresse email</li>
						<li>
							Des informations liées à vos animaux : nom, espèce, âge, race,
							poids, habitudes, soins, etc.
						</li>
					</ul>
					<p>
						Aucune donnée n'est collectée automatiquement à des fins d'analyse
						ou de marketing. Le site n'utilise aucun cookie, traceur ou outil de
						mesure d'audience tiers.
					</p>
					<p>
						📝 Un formulaire de contact pourrait être ajouté prochainement.
						Cette politique sera alors mise à jour en conséquence.
					</p>
				</section>

				<section className="term-section">
					<h2>2. 🎯 Finalité des traitements</h2>
					<p>Les données collectées servent exclusivement à :</p>
					<ul>
						<li>Créer et gérer votre compte utilisateur</li>
						<li>
							Personnaliser votre espace de planification pour vos animaux
						</li>
						<li>
							Sauvegarder vos préférences et historiques liés à vos compagnons à
							poils (ou à plumes, on ne juge pas 🦜)
						</li>
					</ul>
				</section>

				<section className="term-section">
					<h2>3. 🗓️ Conservation des données</h2>
					<p>
						Les données sont conservées tant que votre compte est actif. Vous
						pouvez à tout moment demander la suppression de votre compte et de
						toutes vos données associées.
					</p>
				</section>

				<section className="term-section">
					<h2>4. 🔒 Sécurité</h2>
					<p>
						Vos données sont stockées de manière sécurisée sur des serveurs
						hébergés par OVH, en France. Nous mettons en œuvre des mesures
						techniques et organisationnelles pour protéger vos informations
						contre tout accès non autorisé.
					</p>
				</section>

				<section className="term-section">
					<h2>5. ✅ Vos droits</h2>
					<p>Conformément au RGPD, vous disposez des droits suivants :</p>
					<ul>
						<li>Droit d'accès à vos données</li>
						<li>Droit de rectification</li>
						<li>Droit à l'effacement (« droit à l'oubli »)</li>
						<li>Droit à la limitation du traitement</li>
						<li>Droit à la portabilité</li>
						<li>Droit d'opposition</li>
					</ul>
					<p>
						Pour exercer ces droits ou pour toute question, vous pouvez nous
						contacter à :<br />📧{" "}
						<a href="mailto:contact@pawplanner.com">contact@pawplanner.com</a>
					</p>
				</section>

				<section className="term-section">
					<h2>6. 📝 Modifications</h2>
					<p>
						Cette politique est susceptible d'être modifiée en fonction des
						évolutions techniques, légales ou fonctionnelles du site. La date de
						dernière mise à jour sera toujours indiquée en haut de page.
					</p>
				</section>

				<div className="conclusion">
					<p>
						Merci de votre confiance ! Nous prenons soin de vos données comme
						nous prenons soin des animaux 🐾
					</p>
				</div>
			</div>
		</main>
	);
}

export default PrivacyPolicy;

// This is the PawPlanner terms and conditions page.
// ⚠️ Remember to change the date if you update the content of this document.

import "./GeneralTerms.scss";
import { Link } from "react-router-dom";

function GeneralTerms() {
	return (
		<main className="page-gcu__section">
			<div className="container_gcu">
				<h1>Conditions Générales d'Utilisation (CGU)</h1>
				<p className="last-update">Dernière mise à jour : 08/04/2025</p>

				<div className="introduction">
					<p>
						Bienvenue sur <strong>PawPlanner</strong> !
						<br />
						En créant un compte et en utilisant notre service, vous acceptez ces
						conditions d’utilisation.
						<br />
						Que vous soyez propriétaire de chien ou éducateur·rice canin·e,
						cette page vous explique simplement les règles
					</p>
				</div>

				<section className="term-section">
					<h2>1. 🎯 À quoi sert PawPlanner ?</h2>
					<p>
						PawPlanner est une application qui facilite la réservation
						d’activités entre des éducateur·rices canin·es et leurs client·es
						propriétaires de chiens.
						<br />
						Elle permet :
						<ul>
							<li>
								aux éducateur·rices de publier des activités (cours, balades
								éducatives, séances individuelles, etc.),
							</li>
							<li>
								aux propriétaires de consulter un calendrier, réserver une
								activité, suivre leurs rendez-vous et gérer les infos de leur
								chien.
							</li>
						</ul>
					</p>
				</section>

				<section className="term-section">
					<h2>2. 🧑‍💻 Création de compte</h2>
					<p>
						Pour profiter de PawPlanner, vous devez créer un compte.
						<br />
						Vous vous engagez à :
					</p>
					<ul>
						<li>fournir des informations vraies et à jour,</li>
						<li>garder vos identifiants secrets (mot de passe, email...),</li>
						<li>ne pas usurper l'identité de quelqu'un d'autre.</li>
					</ul>
				</section>

				<section className="term-section">
					<h2>3. 🧾 Utilisation responsable</h2>
					<p>Vous vous engagez à utiliser PawPlanner :</p>
					<ul>
						<li>dans le respect des autres utilisateurs,</li>
						<li>
							sans perturber le fonctionnement du service (pas de spam,
							piratage, etc).
						</li>
					</ul>
					<p>
						Le service est fourni tel quel, sans garantie qu'il soit toujours
						parfait, mais on fait de notre mieux pour que tout fonctionne bien 🛠️
					</p>
				</section>

				<section className="term-section">
					<h2>4. 🔐 Données personnelles</h2>
					<p>
						PawPlanner respecte votre vie privée. Tout est expliqué dans notre{" "}
						<Link to="/privacy-policy">Politique de confidentialité</Link>. On y
						détaille comment sont collectées, utilisées et protégées vos
						données.
					</p>
				</section>

				<section className="term-section">
					<h2>5. 🚫 Résiliation et suppression de compte</h2>
					<p>
						Vous pouvez supprimer votre compte à tout moment depuis votre espace
						personnel ou en nous contactant à l'adresse{" "}
						<a href="mailto:contact@pawplanner.com">contact@pawplanner.com</a>
						<br />
						Nous nous réservons le droit de suspendre un compte en cas de
						non-respect des règles, usage abusif ou comportement frauduleux.
					</p>
				</section>

				<section className="term-section">
					<h2>6. 📦 Contenu et propriété</h2>
					<p>
						Tous les contenus de l'application (textes, images, interface…) nous
						appartiennent ou sont utilisés avec autorisation.
						<br />
						Merci de ne pas les copier ou réutiliser sans notre accord.
					</p>
				</section>

				<section className="term-section">
					<h2>7. ✏️ Modifications des CGU</h2>
					<p>
						Ces CGU peuvent évoluer (on vous préviendra si c'est le cas). En
						continuant d'utiliser l'application, vous acceptez les nouvelles
						versions.
					</p>
				</section>

				<section className="term-section">
					<h2>8. 📬 Nous contacter</h2>
					<p>
						Une question ? Une remarque ? vous pouvez nous écrire à :{" "}
						<a href="mailto:contact@pawplanner.com">contact@pawplanner.com</a>
					</p>
				</section>

				<div className="conclusion">
					<p>
						Merci d'utiliser PawPlanner et de prendre soin de vos compagnons à
						quatre pattes 🐶
						<br />
						Bonne planification !
					</p>
				</div>
			</div>
		</main>
	);
}

export default GeneralTerms;

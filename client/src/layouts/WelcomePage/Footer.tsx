import "./Footer.scss";
import Logo from "@/assets/logo/night-blue/symbol-aside/logo-pawplanner-symbol-aside-night-blue.svg";
import Image from "@/assets/illustrations/chien-high-five-proprietaire-canape.png";

function Footer() {
	return (
		<>
			<section className="welcomepage__footer--bottom">
				<div className="welcomepage__footer--bottom-text">
					<h2 className="welcomepage__footer--bottom-title">
						Et maintenant, envie d’essayer ?
					</h2>
					<p>
						Demandez un rendez-vous avec l’un de nos commerciaux, il vous suffit
						juste de remplir le formulaire de contact.
					</p>
					<a href="/contact" className="homepage__div--bottom-button">
						Demander une démonstration
					</a>
				</div>
				<div className="welcomepage__footer--bottom-img">
					<img src={Image} alt="Homme tenant la patte de son chien" />
				</div>
			</section>

			<footer className="welcomepage__footer">
				<img
					src={Logo}
					className="welcomepage__footer--logo"
					alt="Logo Paw Planner"
				/>
				<div className="welcomepage__footer--pages">
					<p className="welcomepage__footer--navigation">Pages</p>
					<a href="/">Accueil</a>
					<a href="/offres">Offres</a>
					<a href="/contact">Contact</a>
				</div>
				<div className="welcomepage__footer--pages">
					<p className="welcomepage__footer--navigation">Mentions légales</p>
					<a href="/">Politique de confidentialité</a>
					<a href="/offres">Conditions générales de vente</a>
					<a href="/contact">Conditions générales d'utilisation</a>
				</div>
				<div className="welcomepage__footer--support">
					<p className="welcomepage__footer--navigation">Support</p>
					<p>Contactez le support en cas de problème</p>
					<a href="/contact" className="welcomepage__footer--button">
						Contacter le support
					</a>
				</div>
			</footer>
		</>
	);
}

export default Footer;

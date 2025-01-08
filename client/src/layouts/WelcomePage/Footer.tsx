import "./Footer.scss";
import Logo from "@/assets/logo/night-blue/symbol/logo-pawplanner-symbol-night-blue.svg";
import Button from "@/components/_atoms/Button/Button";

function Footer() {
	return (
		<>
			<footer className="welcomepage__footer">
				<div className="welcomepage__footer--logo hidden__mobile">
					<img src={Logo} alt="Logo Paw Planner" />
				</div>
				<div className="welcomepage__footer--lists">
					<ul className="welcomepage__footer--list">
						<p className="welcomepage__footer--title">Pages</p>
						<a href="/">Accueil</a>
						<a href="/services">Services</a>
						<a href="/contact">Contact</a>
					</ul>
					<ul className="welcomepage__footer--list">
						<p className="welcomepage__footer--title">Mentions légales</p>
						<a href="/">Politique de confidentialité</a>
						<a href="/offres">Conditions générales de vente</a>
						<a href="/contact">Conditions générales d'utilisation</a>
					</ul>
				</div>
				<div className="welcomepage__footer--contact">
					<Button
						type="button"
						className="welcomepage__footer--button"
						href="/contact"
					>
						Contacter le support
					</Button>
				</div>
			</footer>
		</>
	);
}

export default Footer;

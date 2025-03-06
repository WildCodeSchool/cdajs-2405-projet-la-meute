import "./Footer.scss";
import Logo from "@/assets/logo/night-blue/symbol/logo-pawplanner-symbol-night-blue.svg";
import Button from "@/components/_atoms/Button/Button";
import { Link } from "react-router-dom";

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
						<Link to="/">Accueil</Link>
						<Link to="/services">Services</Link>
						<Link to="/contact">Contact</Link>
					</ul>
					<ul className="welcomepage__footer--list">
						<p className="welcomepage__footer--title">Mentions légales</p>
						<Link to="/">Politique de confidentialité</Link>
						<Link to="/offres">Conditions générales de vente</Link>
						<Link to="/contact">Conditions générales d'utilisation</Link>
					</ul>
				</div>
				<div className="welcomepage__footer--contact">
					<Button
						type="button"
						style="button"
						className="welcomepage__footer--button"
						href="mailto:contact@pawplanner.com"
					>
						Contacter le support
					</Button>
				</div>
			</footer>
		</>
	);
}

export default Footer;

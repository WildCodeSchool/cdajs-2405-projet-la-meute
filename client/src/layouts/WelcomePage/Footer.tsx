import "./Footer.scss";
import Logo from "@/assets/logo/night-blue/symbol/logo-pawplanner-symbol-night-blue.svg";
import Button from "@/components/_atoms/Button/Button";
import { Link } from "react-router-dom";

function Footer() {
	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};

	return (
		<>
			<footer className="welcomepage__footer">
				<div className="welcomepage__footer--logo hidden__mobile">
					<img src={Logo} alt="Logo Paw Planner" />
				</div>
				<div className="welcomepage__footer--lists">
					<ul className="welcomepage__footer--list">
						<p className="welcomepage__footer--title">Pages</p>
						<Link to="/" onClick={scrollToTop}>
							Accueil
						</Link>
						{/*<Link to="/services" onClick={scrollToTop}>Services</Link> */}
						<Link to="/FAQ" onClick={scrollToTop}>
							FAQ
						</Link>
						<Link to="/contact" onClick={scrollToTop}>
							Contact
						</Link>
					</ul>
					<ul className="welcomepage__footer--list">
						<p className="welcomepage__footer--title">Protection des données</p>
						<Link to="/privacy-policy" onClick={scrollToTop}>
							Politique de confidentialité
						</Link>
						<Link to="/legal-notice" onClick={scrollToTop}>
							Mentions Légales
						</Link>
						{/* <Link to="/offres" onClick={scrollToTop}>Conditions générales de vente</Link>
						<Link to="/contact" onClick={scrollToTop}>Conditions générales d'utilisation</Link> */}
						<Link to="/general-terms" onClick={scrollToTop}>
							Conditions Générales d'utilisation (CGU)
						</Link>
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

import "./HeaderAndMain.scss";
import LogoDesktop from "@/assets/logo/night-blue/symbol-aside/logo-pawplanner-symbol-aside-night-blue.svg";
import LogoMobile from "@/assets/logo/night-blue/symbol/logo-pawplanner-symbol-night-blue.svg";
import { Link } from "react-router-dom";

function Header() {
	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};

	return (
		<header className="welcomepage__header">
			<nav className="welcomepage__header--all">
				<Link className="welcomepage__header--logo" to="/">
					<img
						src={LogoDesktop}
						className="welcomepage__header--logo hidden__mobile"
						alt="Logo Paw Planner"
					/>
					<img
						src={LogoMobile}
						className="welcomepage__header--logo hidden__desktop"
						alt="Logo Paw Planner"
					/>
				</Link>
				<div>
					<Link to="/registration" className="welcomepage__header--button-sign">
						S’inscrire
					</Link>
					<Link to="/login" className="welcomepage__header--button-login">
						Se connecter
					</Link>
				</div>
			</nav>
			<nav>
				<div className="welcomepage__header--links ">
					<Link to="/" onClick={scrollToTop}>
						Accueil
					</Link>
					<Link to="/FAQ" onClick={scrollToTop}>
						FAQ
					</Link>
					<Link to="/contact" onClick={scrollToTop}>
						Contact
					</Link>
				</div>
			</nav>
		</header>
	);
}

export default Header;

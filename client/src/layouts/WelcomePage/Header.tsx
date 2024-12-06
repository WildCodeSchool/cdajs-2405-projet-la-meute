import "./Header.scss";
import Logo from "@/assets/logo/night-blue/symbol-aside/logo-pawplanner-symbol-aside-night-blue.svg";

function Header() {
	return (
		<>
			<header className="welcomepage__header--all">
				<a className="welcomepage__header--logo" href="/">
					<img
						src={Logo}
						className="welcomepage__header--logo"
						alt="Logo Paw Planner"
					/>
				</a>
				<div className="welcomepage__header--links">
					<a href="/">Accueil</a>
					<a href="/services">Services</a>
					<a href="/contact">Contact</a>
				</div>
				<div>
					<a href="/registration" className="welcomepage__header--button-sign">
						S’inscrire
					</a>
					<a href="/login" className="welcomepage__header--button-login">
						Se connecter
					</a>
				</div>
			</header>
		</>
	);
}

export default Header;

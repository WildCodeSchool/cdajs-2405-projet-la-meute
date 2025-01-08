import "./HeaderAndMain.scss";
import LogoDesktop from "@/assets/logo/night-blue/symbol-aside/logo-pawplanner-symbol-aside-night-blue.svg";
import LogoMobile from "@/assets/logo/night-blue/symbol/logo-pawplanner-symbol-night-blue.svg";

function Header() {
	return (
		<header className="welcomepage__header">
			<nav className="welcomepage__header--all">
				<a className="welcomepage__header--logo" href="/">
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
				</a>
				<div>
					<a href="/registration" className="welcomepage__header--button-sign">
						S’inscrire
					</a>
					<a href="/login" className="welcomepage__header--button-login">
						Se connecter
					</a>
				</div>
			</nav>
			<nav>
				<div className="welcomepage__header--links ">
					<a href="/">Accueil</a>
					<a href="/services">Services</a>
					<a href="/contact">Contact</a>
				</div>
			</nav>
		</header>
	);
}

export default Header;

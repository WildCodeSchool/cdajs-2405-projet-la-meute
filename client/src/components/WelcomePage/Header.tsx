import '@/components/WelcomePage/Header.scss';
import Logo from '@/assets/logo/night-blue/symbol-aside/logo-pawplanner-symbol-aside-night-blue.svg';

function Header() {
    return (
        <>
            <header className="welcomepage__header--all">
                <img src={Logo} className='welcomepage__header--logo'></img>
                <div className='welcomepage__header--links'>
                    <a href='/'>Accueil</a>
                    <a href='/services'>Services</a>
                    <a href='/contact'>Contact</a>
                </div>
                <a href='/connexion' className='welcomepage__header--button'>Se connecter / S’inscrire</a>
            </header>
        </>
    );
}

export default Header;
import '@/components/Website/Header.scss';
import Logo from '@/assets/logo/night-blue/symbol-aside/logo-pawplanner-symbol-aside-night-blue.svg';

function Header() {
    return (
        <>
            <header className="website__header--all">
                <img src={Logo} className='website__header--logo'></img>
                <div className='website__header--links'>
                    <a href='/'>Accueil</a>
                    <a href='/services'>Services</a>
                    <a href='/contact'>Contact</a>
                </div>
                <a href='/connexion' className='website__header--button'>Se connecter / S’inscrire</a>
            </header>
        </>
    );
}

export default Header;
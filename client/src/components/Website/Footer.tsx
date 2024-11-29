import '@/components/Website/Footer.scss';
import Logo from '@/assets/logo/night-blue/symbol-aside/logo-pawplanner-symbol-aside-night-blue.svg';
import Image from '@/assets/illustrations/chien-high-five-proprietaire-canape.png';

function Footer() {
    return (
        <>
            <section className="website__footer--bottom">
                <div className="website__footer--bottom-text">
                    <h1>Et maintenant, envie d’essayer ?</h1>
                    <p>Demander un rendez-vous avec l’un de nos commerciaux, il vous suffit juste de remplir le formulaire de contact.</p>
                    <a href="/contact" className='homepage__div--bottom-button'>Demander une démonstration</a>
                </div>
                <div className='website__footer--bottom-img'>
                    <img src={Image}></img>
                </div>
            </section>

            <footer className='website__footer--all'>
                <img src={Logo} className='website__footer--logo'></img>
                <div className='website__footer--pages'>
                    <h5>Pages</h5>
                        <a href='/'>Accueil</a>
                        <a href='/offres'>Offres</a>
                        <a href='/contact'>Contact</a>
                </div>
                <div className='website__footer--pages'>
                    <h5>Mentions légales</h5>
                        <a href='/'>Politique de confidentialité</a>
                        <a href='/offres'>Conditions générales de vente</a>
                        <a href='/contact'>Conditions générales d'utilisation</a>
                </div>
                <div className='website__footer--support'>
                    <h5>Support</h5>
                        <p>Contactez le support en cas de problème</p>
                        <a href='/contact' className='website__footer--button'>Contacter le support</a>
                </div>
            </footer>
        </>
    );
}

export default Footer;
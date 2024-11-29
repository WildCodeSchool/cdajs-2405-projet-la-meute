import '@/pages/Homepage/Homepage.scss';
import Image from '@/assets/illustrations/chien-tenant-en-laisse-plusieurs-chiens-en-ville-1500px.png';

function Homepage() {
    return (
        <>
            <section className="homepage__section--top">
                <div className="homepage__div--top-text">
                    <h1 className='homepage__div--top-h1'>Votre temps est précieux...</h1>
                    <p>Gérez vos plannings et suivez les progrès de chaque chien facilement. Quant à vous amis des chiens, prenez rendez-vous en ligne et suivez l'évolution de l'éducation de votre chien.</p>
                </div>
                <div className='homepage__div--top-img'>
                    <img src={Image}></img>
                </div>
            </section>

            <section className='homepage__section--choice'>
                <h2>De quel côté êtes-vous ?</h2>
                <div className='homepage__div--choice'>
                    <div className='homepage__div--choice-left'>
                        <h3 className='homepage__div--choice-title'>Éducateur</h3>
                        <p className='homepage__div--choice-text'>Optimisez votre emploi du temps grâce à notre plateforme de gestion de planning. En tant qu’Éducateur canin, vous pourrez facilement gérer vos rendez-vous, suivre les progrès de chaque chien et communiquer directement avec les propriétaires !</p>
                    </div>
                    <div className='homepage__div--choice-right'>
                        <h3 className='homepage__div--choice-title'>Propriétaire</h3>
                        <p className='homepage__div--choice-text'>Simplifiez la gestion des séances avec votre Éducateur canin. En tant que Propriétaire, vous pouvez consulter facilement les disponibilités, prendre des rendez-vous en ligne et suivre l’évolution de votre chien. Tout est à portée de clic, pour un apprentissage efficace et adapté à vos besoins.</p>
                    </div>
                </div>
            </section>

            <section className='homepage__section-features'>
                <h2>Fonctionnalités principales</h2>
                <p className="homepage__section-features-text">Retrouvez les différentes fonctionnalités que vous avez sur le site, que vous soyez un Éducateur ou un Propriétaire.</p>
                {/* Cards */}
                <div className='homepage__div--features'>
                    <div className='homepage__cards--features'>
                        <h3 className='homepage__cards--title'>Planning</h3>
                        <p className='homepage__cards--text'>Organisez facilement votre emploi du temps avec un planning intuitif. Gérez vos rendez-vous et disponibilités en quelques clics, pour une gestion simplifiée.</p>
                    </div>
                    <div className='homepage__cards--features'>
                        <h3 className='homepage__cards--title'>Gestion des événements</h3>
                        <p className='homepage__cards--text'>Créez, modifiez et gérez vos événements directement sur la plateforme. Suivez les séances et les interactions avec chaque propriétaire de manière fluide et efficace.</p>
                    </div>
                    <div className='homepage__cards--features'>
                        <h3 className='homepage__cards--title'>Rappels et alertes</h3>
                        <p className='homepage__cards--text'>Recevez des rappels automatiques pour vos rendez-vous et événements à venir. Ne manquez jamais une session grâce à nos alertes personnalisées et pratiques.</p>
                    </div>
                </div>
                <div className='homepage__div--features'>
                    <div className='homepage__cards--features'>
                        <h3 className='homepage__cards--title'>Recherche d'événements</h3>
                        <p className='homepage__cards--text'>Trouvez rapidement les événements ou séances spécifiques grâce à notre moteur de recherche optimisé. Accédez facilement à ce dont vous avez besoin en un instant.</p>
                    </div>
                    <div className='homepage__cards--features'>
                        <h3 className='homepage__cards--title'>Profil personnalisable</h3>
                        <p className='homepage__cards--text'>Personnalisez votre profil avec vos informations, services et horaires. Offrez une expérience sur mesure pour chaque propriétaire et un accès rapide à vos disponibilités.</p>
                    </div>
                    <div className='homepage__cards--features'>
                        <h3 className='homepage__cards--title'>Ajout de plusieurs chiens</h3>
                        <p className='homepage__cards--text'>Ajoutez et gérez plusieurs chiens sur votre compte. Suivez leur progrès individuellement et organisez les séances pour chaque chien en toute simplicité.</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Homepage;
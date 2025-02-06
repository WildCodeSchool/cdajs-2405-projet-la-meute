import "./DogCard.scss";

function Dogcard() {
	return (
		<article className="dogCard">
			<span className="dogCard__picture">
				<img src="https://placehold.co/400" alt="name le chien" />
			</span>
			<span className="dogCard__infos">
				<h3 className="dogCard__infos--name">Rex</h3>
				<p className="dogCard__infos--breed">Loulou de Poméranie</p>
				<p className="dogCard__infos--age">12 ans</p>
				<hr className="dogCard__infos--hr" />
				<p className="dogCard__infos--comment">
					Informations complémentaires lorem iosum etc etc
				</p>
				<a className="dogCard__infos--link" href="/customer/:id">
					{/* FIXME: gestion de l'id */}
					Voir le détail &gt;
				</a>
			</span>
		</article>
	);
}

export default Dogcard;

import "./OwnerCard.scss";

function OwnerCard() {
	return (
		<article className="ownerCard">
			<span className="ownerCard__avatar dashHeader__avatar">
				<img src="https://placehold.co/400" alt="Avatar de l'utilisateur" />
			</span>
			<span className="ownerCard__infos">
				<h3 className="ownerCard__infos--name">John Doe</h3>
				<p className="ownerCard__infos--email">johnexample@gmail.com</p>
				<hr />
				<p className="ownerCard__infos--phone">06 30 12 45 45</p>
				<a className="ownerCard__infos--link" href="/customer/:id">
					Voir le profil &gt;
				</a>{" "}
				{/* FIXME: gestion de l'id */}
			</span>
		</article>
	);
}

export default OwnerCard;

import Button from "@/components/_atoms/Button/Button";
import Tag from "@/components/_atoms/Tag/Tag";

export default function DesignSystem() {
	return (
		<div className="page-ds-layout">
			<div>
				<div>
					<h1 className="h1">Heading 01</h1>
					<p>
						Sert à donner un nom à la page. Il y a un seul texte dans ce style
						par page.
					</p>
					<h2>Heading 02</h2>
					<p>Sert à donner des titres d’étagère de la page.</p>
					<h3>Heading 03</h3>
					<p>Sert pour les sous-titres.</p>
					<h4>Heading 04</h4>
					<p>Sert pour donner des titres à des paragraphes.</p>
					<h5>Heading 05</h5>
					<p>Sert pour les titres du formulaire.</p>
				</div>
				<div>
					<blockquote className="quote1">Quote 01</blockquote>
					<p>Sert à mettre en valeur les thèmes de salon ou des accroches</p>
					<blockquote className="quote2">Display 02</blockquote>
					<p>Sert à mettre en valeur des citations.</p>
				</div>
				<div>
					<p className="body1">
						Body 01 - Exemple de paragraphe pour les styles Body, afin de mettre
						dans le contexte avec lignes.
					</p>
					<p className="body2">
						Body 02 - Exemple de paragraphe pour les styles Body, afin de mettre
						dans le contexte avec lignes.
					</p>
					<p className="body3">
						Body 03 - Exemple de paragraphe pour les styles Body, afin de mettre
						dans le contexte avec lignes.
					</p>
				</div>
				<div>
					<figure>
						<img src="https://placehold.co/600x400" alt="empty placeholder" />
						<figcaption>Caption — Détails</figcaption>
					</figure>
				</div>
				<div>
					<div>
						<div>
							<Button type="form-submit" href="/">
								Form Submit
							</Button>
						</div>
						<div>
							<Button type="form-deny" href="/">
								Form Deny
							</Button>
						</div>
						<div>
							<Button type="invite" href="/">
								Invite a new client
							</Button>
						</div>
						<div>
							<Button type="button" href="/">
								Button
							</Button>
						</div>

						<div>
							<Tag color="#167024" href="/first-tag">
								✨ First Tag
							</Tag>
							<Tag color="#1b1670" href="/second-tag">
								🔥 Second Tag
							</Tag>
							<Tag color="#c728c4" href="/third-tag">
								🎉 Third Tag
							</Tag>
							<Tag color="#ff3729" href="/fourth-tag">
								🎊 Fourth Tag
							</Tag>
						</div>
					</div>
				</div>
				<div>
					<input type="checkbox" />
					<input type="checkbox" disabled={true} />
					<input type="radio" name="radio" value={1} />
					<input type="radio" name="radio" value={2} />
					<input type="radio" name="radio" value={3} disabled={true} />
				</div>
			</div>
		</div>
	);
}

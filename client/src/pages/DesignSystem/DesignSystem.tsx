import Button from "@/components/_atoms/Button/Button";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import NewTag from "@/components/_atoms/Tag/NewTag";
import Tag from "@/components/_atoms/Tag/Tag";
import PlanningHeader from "@/components/_molecules/PlanningHeader/PlanningHeader";
import Form from "@/components/_molecules/Form/Form";

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
					<p>Sert à donner des titres d'étagère de la page.</p>
					<h3>Heading 03</h3>
					<p>Sert pour les sous-titres.</p>
					<h4>Heading 04</h4>
					<p>Sert pour donner des titres à des paragraphes.</p>
					<h5>Heading 05</h5>
					<p>Sert pour les titres du formulaire.</p>
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
					<h2>Dashboard header</h2>
					<PlanningHeader title="Planning" />
				</div>
				<div>
					<h2>Image</h2>
					<figure>
						<img src="https://placehold.co/600x400" alt="empty placeholder" />
						<figcaption>Caption — Détails</figcaption>
					</figure>
				</div>
				<div>
					<h2>Buttons</h2>
					<div>
						<div>
							<Button type="button" style="btn-light" href="/">
								Link light
							</Button>
							<Button type="button" style="btn-light">
								Button light
							</Button>
						</div>
						<div>
							<Button type="button" style="btn-dark" href="/">
								Link dark
							</Button>
							<Button type="button" style="btn-dark">
								Button dark
							</Button>
						</div>
						<div>
							<Button type="button" style="invite" href="/" />
							<Button type="button" style="invite" />
						</div>
						<div>
							<Button type="button" style="button">
								Actual button
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
							<div style={{ backgroundColor: "#04272F", padding: "1rem" }}>
								<NewTag href="" />
							</div>
						</div>
					</div>
				</div>
				<div>
					<h2>Form</h2>
					<Form title="Connectez-vous ici">
						<TextInput style="dark" type="email" />
						<TextInput style="dark" type="password" />
						<Button type="submit" style="btn-dark" href="">
							Annuler
						</Button>
						<Button type="submit" style="btn-light" href="">
							Me connecter
						</Button>
						<p>
							On peut ajouter d'autres <strong>champs</strong>.
							<a href="/">Un lien par exemple</a>.
						</p>
					</Form>
				</div>
			</div>
		</div>
	);
}

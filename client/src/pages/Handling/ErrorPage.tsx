import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import dog404 from "@/assets/illustrations/dog404.png";
import "./ErrorPage.scss";
import Button from "@/components/_atoms/Button/Button";

export default function ErrorPage() {
	const error = useRouteError();
	let title = "";
	let is404 = false;

	if (isRouteErrorResponse(error)) {
		title = `Erreur ${error.status}`;
		is404 = error.status === 404;
	}

	return (
		<main className="notfound">
			<section>
				<h1>Oups !</h1>
				{title && <p>{title}</p>}
				{is404 ? (
					<p>
						La page que vous recherchez <br /> semble introuvable.
					</p>
				) : (
					<p>
						Une erreur inattendue <br /> s'est produite.
					</p>
				)}
				<Button href="/" type="button" style="btn-dark">
					Retour à l'accueil
				</Button>
			</section>
			<img src={dog404} alt="Chien débranchant une prise" />
		</main>
	);
}

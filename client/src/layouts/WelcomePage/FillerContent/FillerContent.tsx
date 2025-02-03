import Button from "@/components/_atoms/Button/Button";
import Image from "@/assets/illustrations/chien-high-five-proprietaire-canape.png";
import "./FillerContent.scss";
import { useLocation } from "react-router-dom";

function FillerContent() {
	const location = useLocation();
	const filledRoutes = ["/services", "/contact"];
	const marginTopIfFiller = filledRoutes.some(
		(route) => location.pathname === route,
	);

	return (
		<section
			style={marginTopIfFiller ? { paddingBlockStart: "15vh" } : undefined}
			className="welcomepage__filler"
		>
			<article className="welcomepage__filler--article">
				<h2 className="homepage__title">Envie d’essayer&nbsp;?</h2>
				<p>Une question&nbsp;? Besoin d'une précision&nbsp;? N'hésitez plus.</p>
				<Button href="mailto:contact@pawplanner.com" type="form-deny">
					Contactez-nous
				</Button>
			</article>
			<div className="welcomepage__filler--img">
				<img src={Image} alt="Homme tenant la patte de son chien" />
			</div>
		</section>
	);
}

export default FillerContent;

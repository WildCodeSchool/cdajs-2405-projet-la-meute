import React from "react";
import Accordion from "@/components/_molecules/Accordion/Accordion";
import { AccordionItemData } from "@/components/_molecules/Accordion/Accordion";
import "@/pages/WelcomePage/FAQ.scss";

function FAQ() {
	const faqItems: AccordionItemData[] = [
		{
			title: "Comment puis-je créer un compte ?",
			content:
				"Le formulaire de création de compte est accessible via le bouton 'S'inscrire' en haut à droite de la page. Il vous suffit de sélectionner le type de compte que vous souhaitez créer soit Éduateur·trice canin·e, soit propriétaire de chien. Pour finir, il vous faudra remplir les champs et cliquer sur 'S'inscrire' pour finaliser votre inscription.",
		},
		{
			title:
				"Je suis Éducateur·trice canin·e, comment puis-je rejoindre la plateforme ?",
			content:
				"Simplement en créant un compte Éducateur·trice canin·e sur notre plateforme, vous pourrez ensuite accéder à toutes les fonctionnalités qui vous permettront de mieux gérer votre emploi du temps et de mieux communiquer avec vos clients.",
		},
		{
			title: "Puis-je modifier mon emploi du temps une fois publié ?",
			content:
				"Oui, vous pouvez modifier votre planning à tout moment. Les changements sont mis à jour en temps réel, et vos clients voient toujours la version la plus récente. Vous pouvez donc créer des évènements quand vous le souhaitez.",
		},
		{
			title: "PawPlanner fonctionne-t-il sur mobile ?",
			content:
				"Oui, l’interface pour les clients est optimisée pour les smartphones. Pour les éducateurs, nous recommandons d’utiliser une tablette ou un ordinateur pour plus de confort, surtout lors de la création ou gestion du planning.",
		},
		{
			title: "Puis-je limiter le nombre de participants à une activité ?",
			content:
				"Oui, pour chaque évènement que vous créez, vous pouvez définir un nombre maximum de participants. Une fois ce nombre atteint, l'évènement s’affiche comme complet et vos clients ne peuvent plus s’y inscrire. Cela vous permet de garder un bon équilibre dans vos groupes et de garantir un encadrement de qualité.",
		},
		{
			title: "Les paiements se font-ils directement sur la plateforme ?",
			content:
				"Actuellement, PawPlanner ne propose pas de système de paiement intégré. Vous pouvez toutefois indiquer les tarifs de vos services et préciser les modalités de règlement (virement, espèces, etc.). Un système de paiement en ligne pourra être ajouté dans une future version, en fonction des besoins des utilisateurs.",
		},
	];

	return (
		<section className="FAQ__section">
			<h2>Foire aux questions</h2>
			<div className="FAQ__container">
				<Accordion items={faqItems} />
			</div>
		</section>
	);
}

export default FAQ;

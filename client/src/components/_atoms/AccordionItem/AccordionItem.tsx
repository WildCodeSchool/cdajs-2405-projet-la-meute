/**
 * AccordionItem.tsx
 * Composant atomique représentant un élément individuel d'accordéon
 * Gère l'affichage et l'interaction d'un seul élément (titre et contenu)
 */

import React from "react";
import "./AccordionItem.scss";

interface AccordionItemProps {
	title: string;
	content: string | React.ReactNode;
	isOpen: boolean;
	onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
	title,
	content,
	isOpen,
	onClick,
}) => {
	return (
		<div className="accordion-item">
			<button aria-expanded={isOpen} onClick={onClick}>
				<span className="accordion-title">{title}</span>
				<span className="icon" aria-hidden="true"></span>
			</button>
			<div className="accordion-content">
				{typeof content === "string" ? <p>{content}</p> : content}
			</div>
		</div>
	);
};

export default AccordionItem;

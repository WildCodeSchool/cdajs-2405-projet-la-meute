/**
 * Accordion.tsx
 * Composant moléculaire qui gère une liste d'éléments d'accordéon
 * Contrôle l'état (ouvert/fermé) de chaque élément et orchestre leur affichage
 */

import React, { useState } from "react";
import AccordionItem from "../../_atoms/AccordionItem/AccordionItem";
import "./Accordion.scss";

export interface AccordionItemData {
	title: string;
	content: string | React.ReactNode;
}

interface AccordionProps {
	items: AccordionItemData[];
	className?: string;
}

const Accordion: React.FC<AccordionProps> = ({ items, className = "" }) => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleAccordion = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className={`accordion ${className}`}>
			{items.map((item, index) => (
				<AccordionItem
					key={index}
					title={item.title}
					content={item.content}
					isOpen={openIndex === index}
					onClick={() => toggleAccordion(index)}
				/>
			))}
		</div>
	);
};

export default Accordion;

/**
 * Accordion.tsx
 * Molecular component that manages a list of accordion items
 * Controls the state (open/closed) of each item and orchestrates their display
 */

import type React from "react";
import { useState, useRef } from "react";
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
	const accordionRef = useRef<HTMLDivElement>(null);

	const toggleAccordion = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className={`accordion ${className}`} ref={accordionRef}>
			{items.map((item, index) => (
				<AccordionItem
					key={`${item}`}
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

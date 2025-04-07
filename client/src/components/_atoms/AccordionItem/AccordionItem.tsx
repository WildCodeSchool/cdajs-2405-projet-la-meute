/**
 * AccordionItem.tsx
 * Atomic component representing an individual accordion item
 * Manages the display and interaction of a single item (title and content)
 */

import React, { useRef, useEffect } from "react";
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
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (buttonRef.current) {
			if (isOpen) {
				buttonRef.current.classList.add("accordion-button-active");
			} else {
				buttonRef.current.classList.remove("accordion-button-active");
			}
		}
	}, [isOpen]);

	return (
		<div className="accordion-item">
			<button
				ref={buttonRef}
				aria-expanded={isOpen}
				onClick={onClick}
				className={isOpen ? "accordion-button-active" : ""}
			>
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

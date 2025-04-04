import "./AccordionItem.scss";

type AccordionItemProps = {
	title: string;
	isOpen: boolean;
	onClick: () => void;
	children: React.ReactNode;
};

function AccordionItem({ title, isOpen, onClick, children }: AccordionItemProps) {
	return (
		<div className="accordion-item">
			<button onClick={onClick} aria-expanded={isOpen}>
				<span className="accordion-title">{title}</span>
				<span className="icon" aria-hidden="true"></span>
			</button>
			<div className="accordion-content">{children}</div>
		</div>
	);
}

export default AccordionItem;

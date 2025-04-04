import { useState } from "react";
import "@/pages/WelcomePage/FAQ.scss";

function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleAccordion = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className="FAQ__section">
			<h2>Foire aux questions</h2>
            <div className="FAQ__container"></div>
			<div className="FAQ__accordion">
				{/** Exemple avec plusieurs questions */}
				{["Question 1", "Question 2", "Question 3"].map((question, index) => (
					<div key={index} className="FAQ__accordion-item">
						<button
							onClick={() => toggleAccordion(index)}
							aria-expanded={openIndex === index}
						>
							<span className="accordion-title">{question}</span>
							<span className="accordion-icon" aria-hidden="true"></span>
						</button>
						{openIndex === index && (
							<div className="accordion-content">
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, natus.
								</p>
							</div>
						)}
					</div>
				))}
			</div>
		</section>
	);
}

export default FAQ;
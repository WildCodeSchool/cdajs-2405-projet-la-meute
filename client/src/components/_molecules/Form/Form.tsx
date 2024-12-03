import React from "react";
import "./Form.scss";
import Button from "@/components/_atoms/Button/Button";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";

export default function Form({
	title,
	children,
}: { title: string; children: React.ReactNode }) {

	// Read { children } as an array to filter elements
	const buttons = React.Children.toArray(children).filter(
		(child) => React.isValidElement(child) && child.type === Button,
	);

	const inputs = React.Children.toArray(children).filter(
		(child) => React.isValidElement(child) && child.type === TextInput,
	);

	const otherFields = React.Children.toArray(children).filter(
		(child) =>
			!React.isValidElement(child) ||
			(child.type !== Button && child.type !== TextInput), // Tout sauf les `Button`
	);
	// -- End children filtering

	return (
		<>
			<form className="form">
				<h2>{title}</h2>
				<div>{inputs}</div>
				<div className="form__buttons">{buttons}</div>
				<div className="form__otherFields">{otherFields}</div>
			</form>
		</>
	);
}

import React from "react";
import "./Form.scss";
import Button from "@/components/_atoms/Button/Button";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";

export default function Form({
	title,
	children,
}: { title: string; children: React.ReactNode }) {
	const buttons = React.Children.toArray(children).filter(
		(child) => React.isValidElement(child) && child.type === Button,
	);
	const inputs = React.Children.toArray(children).filter(
		(child) => React.isValidElement(child) && child.type === TextInput,
	);

	const fields = React.Children.toArray(children).filter(
		(child) =>
			!React.isValidElement(child) ||
			(child.type !== Button && child.type !== TextInput), // Tout sauf les `Button`
	);

	return (
		<>
			<form className="form">
				<h2>{title}</h2>
				<div>{inputs}</div>
				<div className="form__buttons">{buttons}</div>
				<div className="form__fields">{fields}</div>
			</form>
		</>
	);
}

import React from "react";
import "./Form.scss";
import Button from "@/components/_atoms/Button/Button";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";

type FormProps = {
	className?: string;
	title: string;
	children: React.ReactNode;
	onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function Form({
	className,
	title,
	children,
	onSubmit,
}: FormProps) {
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
			(child.type !== Button && child.type !== TextInput),
	);
	// -- End children filtering

	return (
		<form className={`form ${className}`} onSubmit={onSubmit}>
			<h2>{title}</h2>
			<div>{inputs}</div>
			<div className="form__buttons">{buttons}</div>
			<div className="form__otherFields">{otherFields}</div>
		</form>
	);
}

import React from "react";
import "./Form.scss";
import Button from "@/components/_atoms/Button/Button";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";

export default function Form({
	className,
	title,
	children,
	onSubmit,
}: {
	className?: string;
	title: string;
	children: React.ReactNode;
	onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
	// Read { children } as an array to filter elements
	const buttons = React.Children.toArray(children).filter(
		(child) => React.isValidElement(child) && child.type === Button,
	);

	const inputs = React.Children.toArray(children).filter(
		(child) => React.isValidElement(child) && child.type === TextInput,
	);

	const introductiveText = React.Children.toArray(children).filter(
		(child) =>
			React.isValidElement(child) &&
			child.type === "p" &&
			child.props.className === "introductiveText",
	);

	const otherFields = React.Children.toArray(children).filter(
		(child) =>
			!React.isValidElement(child) ||
			(child.type !== Button &&
				child.type !== TextInput &&
				child.props.className !== "introductiveText"),
	);
	// -- End children filtering

	return (
		<form className={`form ${className}`} onSubmit={onSubmit}>
			<h2>{title}</h2>
			{introductiveText}
			<div>{inputs}</div>
			<div className="form__buttons">{buttons}</div>
			<div className="form__otherFields">{otherFields}</div>
		</form>
	);
}

import React, { useState, useRef, useImperativeHandle } from "react";
import "./CheckboxInput.scss";
import {
	CHECKBOX_INPUT_CONFIG,
	type CheckboxInputTypes,
} from "./CheckboxInputConfig";

interface CheckboxInputProps {
	type: CheckboxInputTypes;
	required?: boolean;
	style?: "dark" | "light";
	label?: React.ReactNode;
	className?: string;
	name?: string;
	checked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/** CheckboxInput Component */
const CheckboxInput = React.forwardRef<HTMLInputElement, CheckboxInputProps>(
	(
		{
			type,
			required = false,
			style = "light",
			label,
			className = "",
			name,
			checked,
			onChange,
		},
		ref,
	) => {
		const [error, setError] = useState<string>("");

		const config = CHECKBOX_INPUT_CONFIG[type];
		const mappedLabel = label || config.mappedLabel || "";
		const fieldName = name || config.mappedName || type;
		const validationRules = config.validationRules;

		const inputRef = useRef<HTMLInputElement>(null);
		useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

		const inputId = `checkboxInput-${type}`;

		const validateValue = () => {
			let errorMessage = "";

			if (required && validationRules && !checked) {
				errorMessage = validationRules.message;
			}

			setError(errorMessage);
			return errorMessage === "";
		};

		const handleBlur = () => {
			validateValue();
		};

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (onChange) {
				onChange(e);
			}

			if (error) {
				validateValue();
			}
		};

		return (
			<div
				className={`checkboxInput ${className} checkboxInput__${style} ${error ? "has-error" : ""}`}
				data-error={error}
			>
				<div className="checkbox-container">
					<input
						id={inputId}
						name={fieldName}
						ref={inputRef}
						type="checkbox"
						checked={checked}
						required={required}
						onChange={handleChange}
						onBlur={handleBlur}
						aria-invalid={!!error}
						aria-describedby={error ? `${inputId}-error` : undefined}
					/>
					<label htmlFor={inputId}>
						{mappedLabel}
						{required ? " *" : ""}
					</label>
				</div>
				{error && (
					<div
						id={`${inputId}-error`}
						className="checkbox-error-message"
						style={{ color: "red", fontSize: "14px", marginTop: "5px" }}
					>
						{error}
					</div>
				)}
			</div>
		);
	},
);

export default CheckboxInput;

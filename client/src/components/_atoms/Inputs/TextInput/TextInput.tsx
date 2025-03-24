import React, { useState, useRef, useImperativeHandle } from "react";
import { Eye } from "@/assets/icons/eye.tsx";
import { EyeOff } from "@/assets/icons/eye-off.tsx";
import "./TextInput.scss";
import { TEXT_INPUT_CONFIG, type TextInputTypes } from "./TextInputConfig";

interface TextInputProps {
	type: TextInputTypes;
	required?: boolean;
	passwordRef?: React.RefObject<HTMLInputElement>;
	isLogin?: boolean;
	inputType?: "input" | "textarea" | "date";
	style?: "dark" | "light";
	label?: string;
	placeholder?: string;
	className?: string;
	name?: string;
	value: string;
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
}

/** TextInput Component */
const TextInput = React.forwardRef<
	HTMLInputElement | HTMLTextAreaElement,
	TextInputProps
>(
	(
		{
			type,
			required = false,
			inputType = "input",
			style = "light",
			passwordRef,
			isLogin = false,
			label,
			placeholder,
			className = "",
			name,
			value,
			onChange,
		},
		ref,
	) => {
		const [showPassword, setShowPassword] = useState(false);
		const [error, setError] = useState<string>("");

		const config = TEXT_INPUT_CONFIG[type];
		const mappedLabel = label || config.mappedLabel || "";
		const mappedPlaceholder = placeholder || config.mappedPlaceholder || "";
		const maxLength = config.maxLength;
		const validationPattern = config.validationRules?.pattern;

		const fieldName = name || config.mappedName || type;

		const fieldRequired = required ? " *" : "";
		const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
		useImperativeHandle(
			ref,
			() => inputRef.current as HTMLInputElement | HTMLTextAreaElement,
		);

		const inputId = `textInput-${type}`;
		const isPasswordField: boolean =
			type === "password" || type === "confirmPassword";

		const validateValue = () => {
			if (isLogin) return;

			let errorMessage = "";

			if (required && !value.trim()) {
				errorMessage = "Ce champ est requis";
			} else if (
				type === "confirmPassword" &&
				passwordRef?.current &&
				passwordRef.current.value !== value
			) {
				errorMessage = "Les mots de passe ne correspondent pas";
			} else if (validationPattern && typeof validationPattern === "object") {
				const pattern =
					"value" in validationPattern
						? (validationPattern.value as RegExp)
						: null;
				const message =
					"message" in validationPattern
						? (validationPattern.message as string)
						: "Format invalide";

				if (pattern && value && !pattern.test(value)) {
					errorMessage = message;
				}
			}

			setError(errorMessage);
			return errorMessage === "";
		};

		const handleBlur = () => {
			validateValue();
		};

		const handleChange = (
			e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		) => {
			onChange(e);

			if (error) {
				validateValue();
			}
		};

		return (
			<div
				className={`textInput ${className} textInput__${style} ${!isLogin && error ? "has-error" : ""}`}
				data-error={error}
			>
				<label htmlFor={inputId}>
					{mappedLabel}
					{fieldRequired}
				</label>
				{inputType === "textarea" ? (
					<textarea
						id={inputId}
						name={fieldName}
						ref={ref as React.RefObject<HTMLTextAreaElement>}
						placeholder={mappedPlaceholder}
						required={required}
						value={value}
						onChange={handleChange}
						onBlur={handleBlur}
						maxLength={maxLength}
						aria-invalid={!!error}
						aria-describedby={error ? `${inputId}-error` : undefined}
					/>
				) : (
					<input
						id={inputId}
						name={fieldName}
						ref={ref as React.RefObject<HTMLInputElement>}
						type={
							isPasswordField
								? showPassword
									? "text"
									: "password"
								: inputType === "date"
									? "date"
									: "text"
						}
						placeholder={mappedPlaceholder}
						required={required}
						value={value}
						onChange={handleChange}
						onBlur={handleBlur}
						maxLength={maxLength}
						aria-invalid={!!error}
						aria-describedby={error ? `${inputId}-error` : undefined}
					/>
				)}
				{isPasswordField && (
					<button
						type="button"
						onMouseDown={(e) => {
							e.preventDefault();
							setShowPassword(!showPassword);
						}}
						className="password-toggle"
						aria-label={
							showPassword
								? "Masquer le mot de passe"
								: "Afficher le mot de passe"
						}
					>
						{showPassword ? (
							<EyeOff className="eyes" fill="none" />
						) : (
							<Eye className="eyes" fill="none" />
						)}
					</button>
				)}
			</div>
		);
	},
);

export default TextInput;

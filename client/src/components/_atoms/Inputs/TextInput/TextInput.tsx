import React, { useState, useRef, useImperativeHandle } from "react";
import { Eye } from "@/assets/icons/eye.tsx";
import { EyeOff } from "@/assets/icons/eye-off.tsx";
import "./TextInput.scss";
import { TEXT_INPUT_CONFIG, type TextInputTypes } from "./TextInputConfig";
import validationRules from "@shared/validationRules";

interface TextInputProps {
	type: TextInputTypes;
	required?: boolean;
	passwordRef?: string;
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
		const [isFocused, setIsFocused] = useState(false);

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
			if (isLogin) return true;

			let errorMessage = "";

			// Special treatment for the password field during focus
			if (type === "password" && isFocused) {
				//  Always display password requirements without checking if the field is empty
				errorMessage = validationRules.PASSWORD.message;
				// If the password is valid, the error message is cleared.
				if (validationRules.PASSWORD.pattern.test(value)) {
					errorMessage = "";
				}
			}
			// Special treatment for confirm password field during focus
			else if (type === "confirmPassword" && isFocused) {
				if (passwordRef !== value) {
					errorMessage = "Les mots de passe ne correspondent pas.";
				}
			}
			else if (required && !value.trim()) {
				errorMessage = "Ce champ est requis";
			} else if (type === "password" && !validationRules.PASSWORD.pattern.test(value)) {
				errorMessage = validationRules.PASSWORD.message;
			} else if (type === "confirmPassword" && passwordRef !== value) {
				errorMessage = "Les mots de passe ne correspondent pas.";
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

		const handleFocus = () => {
			setIsFocused(true);
			
			// For the password field, display the requirements in first
			if (isPasswordField && type === "password") {
				if (!validationRules.PASSWORD.pattern.test(value)) {
					setError(validationRules.PASSWORD.message);
				}
			}
			// For confirm password field, check if it matches with password
			else if (type === "confirmPassword") {
				if (passwordRef !== value) {
					setError("Les mots de passe ne correspondent pas.");
				}
			}
		};

		const handleBlur = () => {
			setIsFocused(false);
			validateValue();
		};

		const handleChange = (
			e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		) => {
			onChange(e);
			
			const newValue = e.target.value;
			
			// For the password field, check in real time if the format is correct
			if (isPasswordField && type === "password") {
				// Check is the format is correct
				if (validationRules.PASSWORD.pattern.test(newValue)) {
					// Format is correct so the error message is cleared
					setError("");
				} else {
					// Format is incorrect so the error message is displayed
					setError(validationRules.PASSWORD.message);
				}
			} 
			// For confirm password field, check in real time if it matches with password
			else if (type === "confirmPassword") {
				if (passwordRef === newValue) {
					// Passwords match, clear error
					setError("");
				} else {
					// Passwords don't match, show error
					setError("Les mots de passe ne correspondent pas.");
				}
			}
			else if (error) {
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
						onFocus={handleFocus}
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
						onFocus={handleFocus}
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
import React, { useState, useRef, useImperativeHandle } from "react";
import { Eye } from "@/assets/icons/eye.tsx";
import { EyeOff } from "@/assets/icons/eye-off.tsx";
import "./TextInput.scss";
import { TEXT_INPUT_CONFIG, type TextInputTypes } from "./TextInputConfig";

interface TextInputProps {
	type: TextInputTypes;
	required?: boolean;
	passwordRef?: string | React.RefObject<HTMLInputElement>;
	isLogin?: boolean;
	inputType?: "input" | "textarea" | "date";
	style?: "dark" | "light";
	label?: string;
	placeholder?: string;
	className?: string;
	name?: string;
	count?: boolean;
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
			count,
			onChange,
		},
		ref,
	) => {
		const [showPassword, setShowPassword] = useState(false);
		const [error, setError] = useState<string>("");
		const [lengthCount, setLengthCount] = useState(value.length);
		const [inputTouched, setInputTouched] = useState(false);

		const config = TEXT_INPUT_CONFIG[type];
		const mappedLabel = label || config.mappedLabel || "";
		const mappedPlaceholder = placeholder || config.mappedPlaceholder || "";
		const maxLength = config.maxLength || 1000;
		const validationPattern = config.validationRules?.pattern;
		const validationMessage =
			config.validationRules?.message || "Format invalide";

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

		// Specific password validation function
		const validatePasswordFormat = (value: string): boolean => {
			if (!validationPattern) return true;
			return validationPattern.test(value);
		};

		const validate = (): boolean => {
			if (isLogin) return true;

			let isValid = true;
			let errorMessage = "";

			if (required && !value.trim()) {
				isValid = false;
				errorMessage =
					type === "password" ? validationMessage : "Ce champ est requis";
			} else if (type === "password" && !validatePasswordFormat(value)) {
				isValid = false;
				errorMessage = validationMessage;
			} else if (type === "confirmPassword" && passwordRef !== value) {
				isValid = false;
				errorMessage = "Les mots de passe ne correspondent pas.";
			} else if (
				validationPattern &&
				value.trim() &&
				!validationPattern.test(value)
			) {
				isValid = false;
				errorMessage = validationMessage;
			}

			setError(errorMessage);
			return isValid;
		};

		const handleBlur = () => {
			setInputTouched(true);
			validate();
		};

		const handleChange = (
			e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		) => {
			if (onChange) {
				onChange(e);
			}

			setLengthCount(e.target.value.length);

			if (type === "password" || inputTouched) {
				if (type === "password") {
					const isValid = validationPattern
						? validationPattern.test(e.target.value)
						: true;
					setError(isValid ? "" : validationMessage);
				} else {
					validate();
				}
			}
		};

		const remaining = maxLength - lengthCount;
		let countColor = "default";
		if (remaining <= maxLength * 0.2) {
			countColor = "warning";
		}
		if (remaining === 0) {
			countColor = "error";
		}

		return (
			<div
				className={`textInput ${className} textInput__${style} ${!isLogin && error ? "has-error" : ""} ${count && "length-counter"}`}
				data-error={error}
				data-count={`Caractères restants : ${remaining}`}
				data-color={countColor}
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
						value={value}
						required={required}
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
						value={value}
						required={required}
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
				{type === "password" && !isLogin && (
					// Password info
					<div className="password-info">
						Le mot de passe doit contenir au moins 8 caractères, une majuscule,
						une minuscule, un chiffre et un caractère spécial.
					</div>
				)}
			</div>
		);
	},
);

export default TextInput;

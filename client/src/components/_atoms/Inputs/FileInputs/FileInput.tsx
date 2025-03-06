import type React from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import "./FileInput.scss";

interface FileInputProps {
	label?: string;
	required?: boolean;
	accept?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	style?: "dark" | "light";
	className?: string;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
	(
		{
			label = "Sélectionner un fichier",
			accept = "*/*",
			onChange,
			style = "light",
			className = "",
		},
		ref,
	) => {
		const inputRef = useRef<HTMLInputElement>(null);
		const inputId = `FileInput-${className}`;

		useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

		return (
			<div className={`fileInput ${className} fileInput__${style}`}>
				<label className="fileInput__label" htmlFor={inputId}>
					{label}
				</label>
				<input
					type="file"
					ref={inputRef}
					className="fileInput__input"
					onChange={onChange}
					accept={accept}
					id={inputId}
				/>
			</div>
		);
	},
);

export default FileInput;

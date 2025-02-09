import { useState } from "react";

export const useFileUpload = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files?.[0]) {
			setSelectedFile(event.target.files[0]);
		}
	};

	return {
		selectedFile,
		setSelectedFile,
		handleChange,
	};
};

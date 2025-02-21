import { useState } from "react";

export const useFileUpload = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files?.[0]) {
			setSelectedFile(event.target.files[0]);
		}
	};

	return {
		selectedFile,
		setSelectedFile,
		handleFileChange,
	};
};

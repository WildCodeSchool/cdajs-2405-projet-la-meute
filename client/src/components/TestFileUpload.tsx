import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DOG_PROFIL_PICTURE } from "@/graphQL/mutations/dogs";

function TestFileUpload() {
	const [uploadDogPicture] = useMutation(DOG_PROFIL_PICTURE);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files?.[0]) {
			setSelectedFile(event.target.files[0]);
		}
	};

	const handleSend = async () => {
		if (!selectedFile) {
			console.error("No file selected");
			return;
		}

		try {
			const { data } = await uploadDogPicture({
				variables: {
					file: selectedFile,
					dogId: 1, // Static id for testing
				},
			});
			console.info("Uploaded Photo URL:", data.uploadDogProfilePicture);
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};

	return (
		<div>
			<input type="file" onChange={handleChange} accept="image/*" />
			<button type="button" onClick={handleSend}>
				Send
			</button>
		</div>
	);
}

export default TestFileUpload;

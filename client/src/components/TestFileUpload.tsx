import { useMutation } from "@apollo/client";
import { DOG_PROFIL_PICTURE } from "@/graphQL/mutations/dogs";
import { useFileUpload } from "@/hooks/useFileUpload";

function TestFileUpload() {
	const [uploadDogPicture] = useMutation(DOG_PROFIL_PICTURE);
	const { selectedFile, handleFileChange } = useFileUpload();

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
			console.info("Uploaded Photo URL:", data.uploadDogProfilePicture); // you got an URL , use http://localhost:3200 + URL ans see the magic
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};

	return (
		<div>
			<input type="file" onChange={handleFileChange} accept="image/*" />
			<button type="button" onClick={handleSend}>
				Send
			</button>
		</div>
	);
}

export default TestFileUpload;

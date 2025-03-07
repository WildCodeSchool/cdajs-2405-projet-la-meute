import type { Meta, StoryObj } from "@storybook/react";
import FileInput from "./FileInput";
import React from "react";

const meta: Meta<typeof FileInput> = {
	title: "atoms/FileInput",
	tags: ["autodocs"],
	component: FileInput,
	decorators: [
		(Story) => (
			<div style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof FileInput>;

const DefaultFileInput: Story = {
	args: {
		label: "Sélectionner un fichier",
		accept: "*/*",
		style: "light",
		className: "default-file-input",
	},
};

DefaultFileInput.render = function Render(args) {
	const [fileName, setFileName] = React.useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			setFileName(e.target.files[0].name);
		} else {
			setFileName(null);
		}

		if (args.onChange) {
			args.onChange(e);
		}
	};

	return (
		<div>
			<FileInput {...args} onChange={handleFileChange} />
			{fileName && (
				<p style={{ marginTop: "10px" }}>Fichier sélectionné: {fileName}</p>
			)}
		</div>
	);
};

export { DefaultFileInput };

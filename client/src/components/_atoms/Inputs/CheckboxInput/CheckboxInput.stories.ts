import type { Meta, StoryObj } from "@storybook/react";
import CheckboxInput from "./CheckboxInput";

const meta = {
	title: "atoms/CheckboxInput",
	component: CheckboxInput,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		type: {
			control: "select",
			options: ["checkbox", "radio"],
		},
	},
} satisfies Meta<typeof CheckboxInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		type: "acceptTerms",
		style: "light",
		required: true,
		checked: false,
		label: "J'accepte les Conditions Générales d'Utilisation (CGU)",
		onChange: () => {},
	},
};

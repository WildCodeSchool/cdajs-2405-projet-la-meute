import type { Meta, StoryObj } from "@storybook/react";
import SearchBar from "./SearchBar";

const meta = {
	title: "atoms/SearchBar",
	component: SearchBar,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A search bar component with an input field and a submit button.",
			},
		},
	},
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story: "Default search bar with placeholder text and submit button",
			},
		},
	},
};

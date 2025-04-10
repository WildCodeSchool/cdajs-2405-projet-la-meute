import type { Meta, StoryObj } from "@storybook/react";
import SearchFilters from "./SearchFilters";

const meta = {
	title: "atoms/SearchFilters",
	component: SearchFilters,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		filterOptions: {
			control: "object",
		},
		setFilters: {
			table: {
				disable: true,
			},
		},
	},
} satisfies Meta<typeof SearchFilters>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		filterOptions: ["Chien", "Propriétaire", "Evènement"],
		setFilters: () => {},
	},
};

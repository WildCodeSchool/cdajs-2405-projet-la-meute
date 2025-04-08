import type { Meta, StoryObj } from "@storybook/react";
import Search from "./Search";

const meta = {
	title: "molecules/Search",
	component: Search,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		filterOptions: {
			control: "object",
		},
		setSearchTerm: {
			table: {
				disable: true,
			},
		},
		setFilters: {
			table: {
				disable: true,
			},
		},
	},
} satisfies Meta<typeof Search>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		filterOptions: ["Chien", "Propriétaire", "Evènement"],
		setSearchTerm: () => {},
		setFilters: () => {},
	},
};

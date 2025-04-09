import type { Meta, StoryObj } from "@storybook/react";
import FilterItem from "./FilterItem";

const meta = {
	title: "atoms/FilterItem",
	component: FilterItem,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		filter: {
			control: "text",
		},
		setFilters: {
			action: "clicked",
		},
	},
} satisfies Meta<typeof FilterItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		filter: "filter",
		setFilters: () => {},
	},
};

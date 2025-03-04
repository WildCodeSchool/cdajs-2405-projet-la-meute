import type { Meta, StoryObj } from "@storybook/react";
import Tag from "./Tag";

const meta = {
	title: "atoms/Tag",
	component: Tag,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		color: {
			control: "color",
		},
		children: {
			control: "text",
		},
		href: {
			control: "text",
		},
	},
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstTag: Story = {
	args: {
		color: "#167024",
		children: "✨ First Tag",
		href: "/first-tag",
	},
};

export const SecondTag: Story = {
	args: {
		color: "#1b1670",
		children: "🔥 Second Tag",
		href: "/second-tag",
	},
};

export const ThirdTag: Story = {
	args: {
		color: "#c728c4",
		children: "🎉 Third Tag",
		href: "/third-tag",
	},
};

export const FourthTag: Story = {
	args: {
		color: "#ff3729",
		children: "🎊 Fourth Tag",
		href: "/fourth-tag",
	},
};

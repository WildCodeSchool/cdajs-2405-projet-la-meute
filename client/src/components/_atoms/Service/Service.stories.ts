import type { Meta, StoryObj } from "@storybook/react";
import Service from "./Service";

const meta = {
	title: "atoms/Service",
	component: Service,
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
} satisfies Meta<typeof Service>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstService: Story = {
	args: {
		color: "#167024",
		children: "✨ First Service",
		href: "/first-service",
	},
};

export const SecondService: Story = {
	args: {
		color: "#1b1670",
		children: "🔥 Second Service",
		href: "/second-service",
	},
};

export const ThirdService: Story = {
	args: {
		color: "#c728c4",
		children: "🎉 Third Service",
		href: "/third-service",
	},
};

export const FourthService: Story = {
	args: {
		color: "#ff3729",
		children: "🎊 Fourth Service",
		href: "/fourth-service",
	},
};

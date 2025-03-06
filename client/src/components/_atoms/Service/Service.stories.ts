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
		service: {
			control: {
				id: "1",
				color: "#167024",
				smiley: "🐶",
				title: "First Service",
			},
		},
	},
} satisfies Meta<typeof Service>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstService: Story = {
	args: {
		service: {
			id: "1",
			color: "#167024",
			smiley: "🐶",
			title: "First Service",
		},
	},
};

export const SecondService: Story = {
	args: {
		service: {
			id: "2",
			color: "#167024",
			smiley: "🍟",
			title: "Second Service",
		},
	},
};

export const ThirdService: Story = {
	args: {
		service: { id: "3", color: "#000", smiley: "🥞", title: "third Service" },
	},
};

export const FourthService: Story = {
	args: {
		service: {
			id: "4",
			color: "#ff3729",
			smiley: "🎊",
			title: "Fourth Service",
		},
	},
};

import type { Meta, StoryObj } from "@storybook/react";
import IdCard from "./IdCard";

// Mock data
const dog = {
	id: 1,
	name: "Leo",
	birthDate: new Date("2020-08-17"),
	getAge: 3,
	breed: "Caniche",
	picture: "https://placehold.co/400x400",
	info: "Aime les saucisses",
};

const owner = {
	id: 1,
	lastname: "Dubois",
	firstname: "Marie",
	email: "marie.dubois@gmail.com",
	phone_number: "06 12 34 56 78",
	city: "Lyon",
	postal_code: "69001",
	avatar: "https://placehold.co/400x400",
	role: "owner" as const,
	description: null,
};

const meta = {
	title: "molecules/IdCard",
	component: IdCard,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		type: {
			control: "radio",
			options: ["dog", "owner"],
			description: "Type of ID card to display",
		},
		data: {
			control: "object",
			description: "Data object containing the information to display",
		},
	},
} satisfies Meta<typeof IdCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DogCard: Story = {
	args: {
		type: "dog",
		data: dog,
	},
};

export const OwnerCard: Story = {
	args: {
		type: "owner",
		data: owner,
	},
};

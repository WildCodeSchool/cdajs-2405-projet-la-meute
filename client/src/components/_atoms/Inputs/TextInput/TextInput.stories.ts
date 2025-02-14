import type { Meta, StoryObj } from "@storybook/react";
import TextInput from "./TextInput";

const meta = {
	title: "atoms/TextInput",
	component: TextInput,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		type: {
			control: "select",
			options: [
				"email",
				"password",
				"confirmPassword",
				"lastname",
				"firstname",
				"city",
				"postal_code",
				"SIRET",
				"company_name",
				"telephone",
				"description",
				"name",
				"birthDate",
				"breed",
				"info",
			],
			description: "Type of input field",
		},
		required: {
			control: "boolean",
			description: "Whether the field is required",
		},
		inputType: {
			control: "select",
			options: ["input", "textarea", "date"],
			description: "HTML input type",
		},
		style: {
			control: "select",
			options: ["dark", "light"],
			description: "Visual style of the input",
		},
		label: {
			control: "text",
			description: "Custom label (overrides default label from type)",
		},
		placeholder: {
			control: "text",
			description:
				"Custom placeholder (overrides default placeholder from type)",
		},
		className: {
			control: "text",
			description: "Additional CSS classes",
		},
		isLogin: {
			control: "boolean",
			description: "Whether the input is used in a login form",
		},
	},
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base text input
export const Default: Story = {
	args: {
		type: "firstname",
		style: "light",
		required: true,
	},
};

// Password input with eye toggle
export const Password: Story = {
	args: {
		type: "password",
		style: "dark",
		required: true,
	},
};

// Password confirmation
export const PasswordConfirmation: Story = {
	args: {
		type: "confirmPassword",
		style: "dark",
		required: true,
	},
};

// Textarea variant
export const TextArea: Story = {
	args: {
		type: "description",
		inputType: "textarea",
		style: "light",
	},
};

// Date input
export const DateInput: Story = {
	args: {
		type: "birthDate",
		inputType: "date",
		style: "light",
	},
};

// Dark theme variant
export const DarkTheme: Story = {
	args: {
		type: "email",
		style: "dark",
		required: true,
	},
};

// Login form input (no validation on blur)
export const LoginInput: Story = {
	args: {
		type: "email",
		style: "light",
		required: true,
		isLogin: true,
	},
};

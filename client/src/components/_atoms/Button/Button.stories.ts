import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta = {
	title: "atoms/Button",
	component: Button,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		style: {
			control: "select",
			options: [
				"submit",
				"btn-dark",
				"btn-light",
				"invite",
				"event",
				"button",
				"role-select-left",
				"role-select-right",
				"thin-btn-light",
			],
			table: {
				type: {
					summary:
						"submit | btn-dark | btn-light | invite | event | button | role-select-left | role-select-right | thin-btn-light",
				},
				defaultValue: { summary: "btn-dark" },
			},
		},
		type: {
			control: "select",
			options: ["submit", "button", "reset"],
			table: {
				type: { summary: "submit | button | reset" },
				defaultValue: { summary: "button" },
			},
		},
		children: {
			control: "text",
			description: "Contenu du bouton",
		},
		href: {
			control: "text",
			description: "Lien optionnel (transforme le bouton en lien)",
		},
		className: {
			control: "text",
			description: "Classes CSS additionnelles",
		},
		onClick: {
			action: "clicked",
			description: "Fonction appelée au clic",
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {
	args: {
		style: "btn-dark",
		type: "button",
		children: "btn-dark",
	},
};

export const Light: Story = {
	args: {
		style: "btn-light",
		type: "button",
		children: "btn-light",
	},
};

export const Submit: Story = {
	args: {
		style: "submit",
		type: "submit",
		children: "Me connecter",
	},
};

export const Invite: Story = {
	args: {
		style: "invite",
		href: "#",
	},
};

export const Event: Story = {
	args: {
		style: "event",
		href: "#",
	},
};

export const RoleSelectLeft: Story = {
	args: {
		style: "role-select-left",
		children: "Je suis éducateur·trice canin·e",
	},
};

export const RoleSelectRight: Story = {
	args: {
		style: "role-select-right",
		children: "Je suis un·e propriétaire de chien",
	},
};

export const ThinLight: Story = {
	args: {
		style: "thin-btn-light",
		children: "Valider l'ajout de mon nouveau chien",
	},
};

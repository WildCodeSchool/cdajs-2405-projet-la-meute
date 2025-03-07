import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./Modal";
import Button from "@/components/_atoms/Button/Button";
import React from "react";

const meta: Meta<typeof Modal> = {
	title: "molecules/Modal",
	tags: ["autodocs"],
	component: Modal,
	decorators: [
		(Story) => (
			<div style={{ width: "100%" }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ConfirmModal: Story = {
	args: {
		variant: "confirm",
		type: "info",
		isOpen: true,
		onClose: () => console.log("Modal closed"),
	},
};

ConfirmModal.render = function Render(args) {
	const [isOpen, setIsOpen] = React.useState(args.isOpen);

	const handleClose = () => {
		setIsOpen(false);
		args.onClose();
	};

	return (
		<>
			<Button style="btn-dark" onClick={() => setIsOpen(true)}>
				Ouvrir Modal
			</Button>

			<Modal {...args} isOpen={isOpen} onClose={handleClose}>
				<p>Êtes-vous sûr de vouloir continuer cette action?</p>
				<Button style="btn-dark" onClick={handleClose}>
					Confirmer
				</Button>
			</Modal>
		</>
	);
};

export { ConfirmModal };

import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "react-router-dom";
import Form from "./Form";
import Button from "@/components/_atoms/Button/Button";
import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";

const meta: Meta<typeof Form> = {
	title: "molecules/Form",
	tags: ["autodocs"],
	component: Form,
	decorators: [
		(Story) => (
			<div style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Form>;

const LoginForm: Story = {
	args: {
		title: "Connectez-vous ici",
		className: "login__form",
		style: "dark-blue",
	},
};

LoginForm.render = function Render(args) {
	return (
		<Form {...args}>
			<TextInput
				type="email"
				style={args.style === "dark-blue" ? "dark" : "light"}
				required
				isLogin
			/>
			<TextInput
				type="password"
				style={args.style === "dark-blue" ? "dark" : "light"}
				required
				isLogin
			/>
			<Button style="submit" type="submit">
				Me connecter
			</Button>
			<p className="login__bottomLinks">
				Si vous avez oublié votre mot de passe{" "}
				<Link to="/reset-password">cliquez ici</Link>.
			</p>
			<p className="login__bottomLinks">
				Si vous n'êtes pas inscrit, vous pouvez{" "}
				<Link to="/registration">vous inscrire ici</Link>.
			</p>
			<p className="login__errorMessage">Message d'erreur exemple</p>
		</Form>
	);
};

export { LoginForm };

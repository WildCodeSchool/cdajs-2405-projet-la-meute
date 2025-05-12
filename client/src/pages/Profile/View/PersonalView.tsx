import TextInput from "@/components/_atoms/Inputs/TextInput/TextInput";
import type { ProfileFormValues } from "../Profile";

interface FormType {
	values: ProfileFormValues;
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
}

interface PersonalViewProps {
	form: FormType;
	isTrainer: boolean;
}

function PersonalView({ form, isTrainer }: PersonalViewProps) {
	return (
		<>
			<TextInput
				style="light"
				type="email"
				name="email"
				value={form.values.email}
				onChange={form.handleChange}
			/>
			<TextInput
				style="light"
				type="telephone"
				name="phone_number"
				value={form.values.phone_number}
				onChange={form.handleChange}
			/>
			{isTrainer && (
				<>
					<TextInput
						style="light"
						type="SIRET"
						name="siret"
						value={form.values.siret}
						onChange={form.handleChange}
					/>
					<TextInput
						style="light"
						type="company_name"
						name="company_name"
						value={form.values.company_name}
						onChange={form.handleChange}
					/>
				</>
			)}
		</>
	);
}

export default PersonalView;

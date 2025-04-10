import validationRules from "@/helpers/readonly/validationRules";

export type CheckboxInputTypes = "acceptTerms";

export interface CheckboxInputConfigItem {
	mappedLabel: React.ReactNode;
	mappedName: string;
	validationRules?: {
		pattern: RegExp;
		message: string;
	};
}

export const CHECKBOX_INPUT_CONFIG: Record<
	CheckboxInputTypes,
	CheckboxInputConfigItem
> = {
	acceptTerms: {
		mappedLabel: "J'accepte les Conditions Générales d'Utilisation (CGU)",
		mappedName: "acceptTerms",
		validationRules: {
			pattern: validationRules.TERMS.pattern,
			message: validationRules.TERMS.message,
		},
	},
};

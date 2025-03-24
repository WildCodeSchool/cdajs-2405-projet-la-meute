import type { RegisterOptions } from "react-hook-form";
import validationRules from "@shared/validationRules";

export type TextInputTypes =
	| "email"
	| "password"
	| "confirmPassword"
	| "lastname"
	| "firstname"
	| "city"
	| "postal_code"
	| "SIRET"
	| "company_name"
	| "telephone"
	| "description"
	| "name"
	| "birthDate"
	| "breed"
	| "info"
	| "title";

export interface TextInputConfigItem {
	mappedLabel: string;
	mappedPlaceholder: string;
	mappedName: string;
	validationRules?: RegisterOptions;
	maxLength?: number;
}

export const TEXT_INPUT_CONFIG: Record<
	TextInputTypes,
	{
		mappedLabel: string;
		mappedPlaceholder: string;
		mappedName: string;
		validationRules?: RegisterOptions;
		maxLength?: number;
	}
> = {
	email: {
		mappedLabel: "Email",
		mappedPlaceholder: "Entrez votre email",
		mappedName: "email",
		validationRules: {
			pattern: {
				value: validationRules.EMAIL.pattern,
				message: validationRules.EMAIL.message,
			},
		},
		maxLength: 255,
	},
	password: {
		mappedLabel: "Mot de passe",
		mappedPlaceholder: "Entrez votre mot de passe",
		mappedName: "password",
		validationRules: {
			pattern: {
				value: validationRules.PASSWORD.pattern,
				message: validationRules.PASSWORD.message,
			},
		},
		maxLength: 255,
	},
	confirmPassword: {
		mappedLabel: "Confirmation mot de passe",
		mappedPlaceholder: "Confirmer le mot de passe",
		mappedName: "confirmPassword",
		maxLength: 255,
	},
	lastname: {
		mappedLabel: "Nom",
		mappedPlaceholder: "Entrez votre nom",
		mappedName: "lastname",
		maxLength: 255,
	},
	firstname: {
		mappedLabel: "Prénom",
		mappedPlaceholder: "Entrez votre prénom",
		mappedName: "firstname",
		maxLength: 255,
	},
	city: {
		mappedLabel: "Ville",
		mappedPlaceholder: "Entrez votre ville",
		mappedName: "city",
		maxLength: 50,
	},
	postal_code: {
		mappedLabel: "Code Postal",
		mappedPlaceholder: "Entrez votre code postal",
		mappedName: "postal_code",
		validationRules: {
			pattern: {
				value: validationRules.POSTAL_CODE.pattern,
				message: validationRules.POSTAL_CODE.message,
			},
		},
		maxLength: 5,
	},
	SIRET: {
		mappedLabel: "SIRET",
		mappedPlaceholder: "Entrez votre SIRET",
		mappedName: "SIRET",
		validationRules: {
			pattern: {
				value: validationRules.SIRET.pattern,
				message: validationRules.SIRET.message,
			},
		},
		maxLength: 14,
	},
	company_name: {
		mappedLabel: "Nom de l'entreprise",
		mappedPlaceholder: "Entrez le nom de votre entreprise",
		mappedName: "company_name",
		maxLength: 255,
	},
	telephone: {
		mappedLabel: "Numéro de téléphone",
		mappedPlaceholder: "Entrez votre numéro de téléphone",
		mappedName: "telephone",
		validationRules: {
			pattern: {
				value: validationRules.PHONE.pattern,
				message: validationRules.PHONE.message,
			},
		},
		maxLength: 15,
	},
	description: {
		mappedLabel: "Description",
		mappedPlaceholder: "Entrez votre description",
		mappedName: "description",
		maxLength: 1000,
	},
	name: {
		mappedLabel: "Nom de mon chien",
		mappedPlaceholder: "Entrez le nom de votre chien",
		mappedName: "name",
		maxLength: 255,
	},
	birthDate: {
		mappedLabel: "Date de naissance de mon chien",
		mappedPlaceholder: "Sélectionnez la date de naissance",
		mappedName: "birthDate",
	},
	breed: {
		mappedLabel: "Race de mon chien",
		mappedPlaceholder: "Entrez la race de votre chien",
		mappedName: "breed",
		maxLength: 255,
	},
	info: {
		mappedLabel: "Informations complémentaires",
		mappedPlaceholder: "Entrez un commentaire sur votre chien",
		mappedName: "info",
		maxLength: 1000,
	},
	title: {
		mappedLabel: "Nom de l'évènement",
		mappedPlaceholder: "Entrez le nom de l'évènement",
		mappedName: "title",
		maxLength: 255,
	},
};
